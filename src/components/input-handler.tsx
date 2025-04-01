import React, { useEffect, useState } from "react";
import { useKeyboardInput } from "./input/keyboard";
import { useGamepadInput } from "./input/gamepad";
import { wsLogger, clearLogs } from "../utils/logger";

export const FlightControls: React.FC = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [lastInputSource, setLastInputSource] = useState<string>(""); // Track last input source
  const [connectionStatus, setConnectionStatus] =
    useState<string>("disconnected");
  const [errorCount, setErrorCount] = useState<number>(0);
  const retryDelay = 2000; // Delay in milliseconds (2 sec)
  const port = "ws://localhost:5001";

  const connectWebSocket = () => {
    // Clear previous connection errors if we're trying to reconnect
    if (errorCount > 0) {
      clearLogs();
      setErrorCount(0);
    }

    setConnectionStatus("connecting");
    // Only log connection attempts if we haven't had too many errors
    if (errorCount < 2) {
      wsLogger.status(`Connecting to ${port}...`);
    }

    const ws = new WebSocket(port);

    ws.onopen = () => {
      wsLogger.status("Connected successfully");
      setSocket(ws);
      setConnectionStatus("connected");
    };

    ws.onerror = (error) => {
      // Only log errors if we haven't exceeded the error count limit
      if (errorCount < 2) {
        wsLogger.error(error, 2000); // Add throttling to error logs
        setErrorCount((prev) => prev + 1);
      }
      setConnectionStatus("error");
    };

    ws.onclose = () => {
      // Only log disconnection if we were previously connected
      if (connectionStatus === "connected") {
        wsLogger.status("Disconnected");
      }
      setSocket(null);
      setConnectionStatus("disconnected");

      // Only show reconnection message for the first few attempts
      if (errorCount < 2) {
        wsLogger.info(`Reconnecting in ${retryDelay / 1000}s...`, 5000); // Add throttling
      }
      setTimeout(connectWebSocket, retryDelay);
    };

    return ws;
  };

  useEffect(() => {
    const ws = connectWebSocket();
    return () => {
      ws.close();
    };
  }, []);

  const sendControl = (command: string, value: number, source: string) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      // Sometimes gamepad actions are interpreted as keyboard inputs
      // Prevent sending keyboard commands if gamepad is being used
      if (source === "keyboard" && lastInputSource === "gamepad") return;

      setLastInputSource(source);

      const payload = { command, value, source };
      socket.send(JSON.stringify(payload));

      // Only log significant commands to reduce spam
      if (source === "gamepad") {
        // Only log gamepad commands for button presses or extreme axis values
        if (command.includes("stick") ? Math.abs(value) > 0.8 : value !== 0) {
          wsLogger.command(payload, 1000); // Add throttling for gamepad commands
        }
      } else if (source === "keyboard") {
        wsLogger.command(payload, 500); // Add throttling for keyboard commands
      }
    }
  };

  useKeyboardInput(sendControl);
  useGamepadInput(sendControl);

  // Return a minimal visual indicator for connection status
  // This will be hidden but can help with debugging
  return React.createElement("div", {
    style: {
      position: "fixed",
      bottom: 5,
      right: 5,
      width: 10,
      height: 10,
      borderRadius: "50%",
      backgroundColor:
        connectionStatus === "connected"
          ? "green"
          : connectionStatus === "connecting"
            ? "orange"
            : connectionStatus === "error"
              ? "red"
              : "gray",
      opacity: 0.7,
      zIndex: 1000,
    },
    title: `WebSocket: ${connectionStatus}`,
  });
};
