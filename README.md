# AeroSim Application

Dekstop application with user interface for AeroSim. The AeroSim app enables users to view the simulation’s main viewport, access live feeds from additional cameras, monitor flight data via the PFD, and control the simulation through various scripts using either a keyboard or a gamepad.

Built with [React](https://react.dev/), [electron](https://www.electronjs.org/), [bun](https://bun.sh/) and [vite](https://vite.dev/).

![Example view of the aerosim app](images/app_example.jpg)

## Starting a simulation

1. Clone and install the [aerosim repository](https://github.com/aerosim-open/aerosim).

2. Install the required repositories running `install_aerosim.sh/bat`, which includes this repository.

3. Start the simulation enabling _Pixel Streaming_ with the `--pixel-streaming` tag. Two renderers are available, Unreal Engine and Omniverse.

   - Launch with Unreal Engine:

     - Linux:

     ```bash
     # for launching with Editor interface
     ./launch_aerosim.sh --unreal-editor --pixel-streaming

     # for launching Editor in stand-alone game mode with off-screen rendering
     ./launch_aerosim.sh --unreal-editor-nogui --pixel-streaming

     # for launching a packaged binary with off-screen rendering
     ./launch_aerosim.sh --unreal --pixel-streaming
     ```

     - Windows:

     ```sh
     # for launching with Editor interface
     launch_aerosim.bat --unreal-editor --pixel-streaming

     # for launching Editor in stand-alone game mode with off-screen rendering
     launch_aerosim.bat --unreal-editor-nogui --pixel-streaming

     # for launching a packaged binary with off-screen rendering
     launch_aerosim.bat --unreal --pixel-streaming
     ```

   - Launch with Omniverse:

     - Linux:

     ```
     ./launch_aerosim.sh --omniverse --pixel-streaming
     ```

     - Windows:

     ```
     launch_aerosim.bat --omniverse --pixel-streaming
     ```

4. If launched with the Unreal editor interface, click on the _Pixel Streaming_ drop down button, enable _Use Remote Signalling Server_ and the click _Stream Level Editor_ to start streaming the viewport view.

5. Press play and run a simulation script.

## Using the application

When launching, the app window will open automatically. The AeroSim app allows the user to visualize the viewport of the simulation, other cameras streaming images, the flight data through the PFD and control the simulation in some scripts using either the keyboard or a gamepad.

- After starting running a script, press in the reload button to synchronize with the simulation data.

- Press the camera and PFD buttons to enable to enable/disable the visualization of these elements. You can drag and resize them to set them in the preferred configuration.

- Note that the camera images will only be visible if the `capture_enabled` is set to true for the camera sensor in the correspondent config file of the running script.

![Buttons of the app](images/buttons.png)

## Control the simulation

There are some AeroSim scripts which allow to manually control the simulation through the app, either using keyboard or gamepad:

- [first_flight.py](https://github.com/aerosim-open/aerosim/blob/main/examples/first_flight.py)
- [autopilot_daa_scenario.py](https://github.com/aerosim-open/aerosim/blob/main/examples/autopilot_daa_scenario.py)
- [pilot_control_with_flight_deck.py](https://github.com/aerosim-open/aerosim/blob/main/examples/pilot_control_with_flight_deck.py).

The specific controls are described here for each case. Refer to these scripts for further information.

### [first_flight.py](https://github.com/aerosim-open/aerosim/blob/main/examples/first_flight.py)

This is a simplified example that shows the core functionality of an AeroSim simulation. The airplane will take off under autopilot control, but with the AeroSim App window active you can use the keyboard to adjust the autopilot setpoints:

- `Up arrow` key increases airspeed setpoint (non-zero setpoint sets throttle to 100%)
- `Down arrow` key decreases airspeed setpoint (zero setpoint sets throttle to 0%)
- `W` key increases altitude setpoint (ascend)
- `S` key decreases altitude setpoint (descend)
- `A` key decreases heading setpoint (turn left)
- `D` key increases heading setpoint (turn right)

### [autopilot_daa_scenario.py](https://github.com/aerosim-open/aerosim/blob/main/examples/autopilot_daa_scenario.py)

In the autopilot DAA (Detect and Avoid) example, the EVTOL aircraft will take off and follow a set of waypoints under autopilot control.

During the flight, an intruder airplane will fly towards the EVTOL aircraft to simulate a potential DAA situation. With the AeroSim App window active you can take manual control to avoid a collision by using a gamepad (such as an Xbox controller):

- `B` button activates manual control

In hover mode (low speed):

- Left stick controls yaw and altitude
- Right stick controls forward speed and lateral speed

In forward flight mode (high speed):

- Left stick controls pitch and yaw
- Right stick controls forward speed and roll

### [pilot_control_with_flight_deck.py](https://github.com/aerosim-open/aerosim/blob/main/examples/pilot_control_with_flight_deck.py)

This example demonstrates how to run a simulation to fly an airplane with a
flight deck.

Enter `1`, `2`, or `3` in the terminal to choose the control mode from the options listed above. Use keyboard or gamepad inputs with the AeroSim App window active:

1. For mode `1` using a gamepad (such as an Xbox controller):

   - `Y` button increases power (sets throttle to 100%)
   - `A` button decreases power (sets throttle to 0%)
   - Left stick controls roll and pitch
   - Right stick controls yaw

2. For mode `2` using the keyboard:

   - `Up arrow` key increases airspeed setpoint (non-zero setpoint sets throttle to 100%)
   - `Down arrow` key decreases airspeed setpoint (zero setpoint sets throttle to 0%)
   - `W` key increases altitude setpoint (ascend)
   - `S` key decreases altitude setpoint (descend)
   - `A` key decreases heading setpoint (turn left)
   - `D` key increases heading setpoint (turn right)

3. For mode `3`, autopilot control automatically flies the flight plan waypoints specified in `example_flight_plan.json`. No keyboard/joystick control is employed.

## PFD Components

When running the simulation you will be able to see a small screen with some UI elements. This is the Primary Flight Display (PFD) that is useful gor giving the pilot information about the current flight situatiation.

![PFD elements](images/pfd.png)

1. Airspeed tape:

   - This is the tape visible at the left of the screen. This will show the pilot both the current airspeed value and the True Air Speed (TAS) value right at the bottom of the tape.

2. Altitude tape:

   - Same as the airspeed but will show the current altitude your flight is currently in. At the top you will see the altitude alert value and at the bottom you can see the barometer settings.

3. Bank Angle:

   - Located at the center of the screen and represented by squares displaced radially and a fixed triangle pointer. This shows the roll amount of the flight, this works in conjunction with the Pitch Ladder and the Artificial Horizon (Point 4).

4. Pitch ladder/Artificial Horizon:

   - Right under the bank angle. This shows the current pitch of the plane, between the values of 90 and -90. The artificial horizon is the 2 background colors that are used to simulate the horizon of the flight, the point where the 2 color meet always coincide with the pitch value of 0 in the pitch ladder.

5. Horizontal Situation Indicator (HSI):
   - This is the compass rose right below the pitch ladder, this is used to indicate the heading, VOR mode and deviation of the flight path.

## Running the app independently

When launching the AeroSim simulation, the AeroSim app starts automatically. However, it is possible to launch it independently of the simulation. Here are the required steps.

1.  Install [bun](https://bun.sh/).

    - Linux:

    ```
    curl -fsSL https://bun.sh/install | bash
    ```

    - Windows:

    ```
    powershell -c "irm bun.sh/install.ps1 | iex"
    ```

2.  Clone this repository and set the terminal/console directory to the `aerosim-app` folder

3.  Install the required dependencies (only the first time running the application):

```
bun install
```

4. Run the app:

```
bun run dev
```

## License

This project is dual-licensed under both the MIT License and the Apache License, Version 2.0.
You may use this software under the terms of either license, at your option.

See the [LICENSE](LICENSE) file for details.
