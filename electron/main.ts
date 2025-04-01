import { app, BrowserWindow, session } from "electron";
import path from "path";

const isDev = process.env.NODE_ENV !== "production";

// Get renderer from environment variable or command line arguments
const getRenderer = () => {
  // First check environment variable
  if (process.env.RENDERER) {
    const renderer = process.env.RENDERER.toLowerCase();
    if (renderer === "unreal" || renderer === "omniverse") {
      return renderer;
    }
  }

  // Then check command line arguments
  const args = process.argv.slice(2);
  const rendererArg = args.find((arg) => arg.startsWith("--renderer="));
  if (rendererArg) {
    const renderer = rendererArg.split("=")[1].toLowerCase();
    if (renderer === "unreal" || renderer === "omniverse") {
      return renderer;
    }
  }

  return "unreal"; // Default to unreal if not specified
};

// CSP for production - more restrictive
const prodCSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self'",
  "worker-src 'self' blob:",
  "img-src 'self' data:",
  "connect-src 'self'",
].join("; ");

// CSP for development - allows HMR and Monaco Editor
const devCSP = [
  "default-src 'self' 'unsafe-inline' data: blob: ws: wss: http://localhost:* https://localhost:*",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:5173 https://cdn.jsdelivr.net",
  "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net",
  "font-src 'self' https://cdn.jsdelivr.net",
  "worker-src 'self' blob:",
  "img-src 'self' data: https:",
].join("; ");

async function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: true,
      preload: path.join(__dirname, "preload.cjs"),
      devTools: true,
    },
  });

  // Enable WebGPU
  app.commandLine.appendSwitch("enable-unsafe-webgpu");

  // Set up CSP
  session.defaultSession.webRequest.onHeadersReceived(
    (details: any, callback: any) => {
      callback({
        responseHeaders: {
          ...details.responseHeaders,
          "Content-Security-Policy": [isDev ? devCSP : prodCSP],
        },
      });
    }
  );

  const renderer = getRenderer();
  if (isDev) {
    // Wait for dev server to be ready
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await mainWindow.loadURL(`http://localhost:5173?renderer=${renderer}`);
  } else {
    const startUrl = `file://${path.join(__dirname, "../dist/index.html")}`;
    const urlWithRenderer = `${startUrl}${startUrl.includes("?") ? "&" : "?"}renderer=${renderer}`;
    await mainWindow.loadURL(urlWithRenderer);
  }

  // Log any load failures
  mainWindow.webContents.on(
    "did-fail-load",
    (event: any, errorCode: any, errorDescription: any) => {
      console.error("Failed to load:", errorCode, errorDescription);
    }
  );
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
