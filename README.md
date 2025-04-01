# AeroSim Application

Dekstop application with user interface for AeroSim. Built with [electron](https://www.electronjs.org/) and [vite](https://vite.dev/).

## Usage

### 1. Simulation setup

1. Clone and install the [aerosim repository](https://github.com/aerosim-open/aerosim).

2. Start the simulation enabling *Pixel Streaming* with the `--pixel-streaming` tag.

- Linux:
```
(for launching with Editor interface)
./launch_aerosim.sh --unreal-editor --pixel-streaming

(for launching Editor in stand-alone game mode with off-screen rendering)
./launch_aerosim.sh --unreal-editor-nogui --pixel-streaming

(for launching a packaged binary with off-screen rendering)
./launch_aerosim.sh --unreal --pixel-streaming
```
- Windows:
```
(for launching with Editor interface)
launch_aerosim.bat --unreal-editor --pixel-streaming

(for launching Editor in stand-alone game mode with off-screen rendering)
launch_aerosim.bat --unreal-editor-nogui --pixel-streaming

(for launching a packaged binary with off-screen rendering)
launch_aerosim.bat --unreal --pixel-streaming
```

3. If launched with the editor interface, click on the *Pixel Streaming* drop down button, enable *Use Remote Signalling Server* and the click *Stream Level Editor* to start streaming the viewport view.

4. Press play and run a simulation script.

### 2. Application setup

This application is run with [bun](https://bun.sh/), and makes use of [electron](https://www.electronjs.org/) and [vite](https://vite.dev/).

1.  Install [bun](https://bun.sh/).
- Linux:
```
curl -fsSL https://bun.sh/install | bash
```

- Windows:
```
powershell -c "irm bun.sh/install.ps1 | iex"
```

2. Clone this repository and set the terminal/console directory to the `aerosim-app` folder

3. Install the required dependencies (only the first time running the application):

```
bun install
```

4. Run the app:

```
bun run dev
```

5. Control the simulation in the SimView tab.

For specifying a specific renderer, e.g. Unreal or Omniverse, set a `RENDERER` environment variable. For instance,  in Windows powershell: `$env:RENDERER="unreal"` or `$env:RENDERER="omniverse"`. If none renderer is specified, the default `"unreal"` is employed.

## License

This project is dual-licensed under both the MIT License and the Apache License, Version 2.0.
You may use this software under the terms of either license, at your option.

See the [LICENSE](LICENSE) file for details.
