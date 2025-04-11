import { useEffect, useRef } from "react";
import { gamepadLogger } from "../../utils/logger";

export const useGamepadInput = (
  sendControl: (command: string, value: number, source: string) => void
) => {
  const lastSentValues = useRef<{ [key: string]: number }>({});
  const lastButtonValues = useRef<{ [key: string]: number }>({});
  const animationFrameId = useRef<number | null>(null);
  const isGamepadInitialized = useRef<boolean>(false);

  const pollGamepad = () => {
    const gamepad = navigator.getGamepads()[0];
    if (gamepad) {
      // Only log gamepad status once when first initialized
      if (!isGamepadInitialized.current) {
        gamepadLogger.status(`Active gamepad: ${gamepad.id}`);
        isGamepadInitialized.current = true;
      }

      const scaleFactors: { [key: string]: number } = {
        left_stick_x: 1.0,
        left_stick_y: 1.0,
        right_stick_x: 1.0,
        right_stick_y: 1.0,
      };

      // Map physical controller axes to the expected FMU input names
      const axisMap: [string, number, number][] = [
        ["left_stick_x", gamepad.axes[0], scaleFactors["left_stick_x"]], // Left stick X-axis (horizontal)
        ["left_stick_y", gamepad.axes[1], scaleFactors["left_stick_y"]], // Left stick Y-axis (vertical)
        ["right_stick_x", gamepad.axes[2], scaleFactors["right_stick_x"]], // Right stick X-axis (horizontal)
        ["right_stick_y", gamepad.axes[3], scaleFactors["right_stick_y"]], // Right stick Y-axis (vertical)
      ];

      axisMap.forEach(([command, value, scale]) => {
        // Apply dead zone to ignore small axis movements
        if (Math.abs(value) > 0.1) {
          // Apply scale factor
          const scaledValue = value * scale;

          // Send only if value changes significantly
          if (
            Math.abs((lastSentValues.current[command] || 0) - scaledValue) >
            0.05
          ) {
            // Only log significant changes to reduce spam (increased threshold from 0.2 to 0.4)
            if (
              Math.abs((lastSentValues.current[command] || 0) - scaledValue) >
              0.4
            ) {
              gamepadLogger.axisChange(command, scaledValue, 500); // Add throttling of 500ms
            }
            sendControl(command, scaledValue, "gamepad");
            lastSentValues.current[command] = scaledValue;
          }
        } else {
          // If inside the deadzone and last value was not zero, send zero
          if (lastSentValues.current[command] !== 0) {
            // Only log when changing from non-zero to zero
            gamepadLogger.axisChange(command, 0, 1000); // Add throttling of 1000ms for zero values
            sendControl(command, 0, "gamepad");
            lastSentValues.current[command] = 0;
          }
        }
      });

      // Mapping Gamepad Buttons with null checks
      const buttonMap: [string, number][] = [
        [
          "power_cmd",
          gamepad.buttons[3]?.pressed
            ? 1
            : gamepad.buttons[0]?.pressed
              ? -1
              : 0,
        ], // Y button (3) increases, A button (0) decreases power
        [
          "wheel_steer_cmd",
          gamepad.buttons[6]?.pressed
            ? -1
            : gamepad.buttons[7]?.pressed
              ? 1
              : 0,
        ], // LB button (6) steers left, RB button (7) steers right
        [
          "wheel_brake_cmd",
          gamepad.buttons[4]?.pressed
            ? 1
            : gamepad.buttons[5]?.pressed
              ? -1
              : 0,
        ], // LT button (4) applies brake, RT button (5) releases brake
        ["manual_override", gamepad.buttons[1]?.pressed ? 1 : 0], // B button (1) activates manual override
      ];

      buttonMap.forEach(([command, value]) => {
        // Only send and log if the value changed
        if (value !== 0 && lastButtonValues.current[command] !== value) {
          gamepadLogger.buttonPress(command, value);
          sendControl(command, value, "gamepad");
          lastButtonValues.current[command] = value;
        } else if (value === 0 && lastButtonValues.current[command] !== 0) {
          // Reset button value when released
          lastButtonValues.current[command] = 0;
        }
      });
    }

    animationFrameId.current = requestAnimationFrame(pollGamepad);
  };

  useEffect(() => {
    const startPolling = () => {
      if (animationFrameId.current === null) {
        // gamepadLogger.info("Starting gamepad polling");
        pollGamepad();
      }
    };

    const stopPolling = () => {
      if (animationFrameId.current !== null) {
        // gamepadLogger.info("Stopping gamepad polling");
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
    };

    const handleGamepadConnected = (e: GamepadEvent) => {
      // gamepadLogger.info(`Gamepad connected: ${e.gamepad.id}`);
      startPolling();
    };

    const handleGamepadDisconnected = (e: GamepadEvent) => {
      // gamepadLogger.info(`Gamepad disconnected: ${e.gamepad.id}`);
      stopPolling();
    };

    window.addEventListener("gamepadconnected", handleGamepadConnected);
    window.addEventListener("gamepaddisconnected", handleGamepadDisconnected);

    // Check if any gamepads are already connected
    const gamepads = navigator.getGamepads();
    for (let i = 0; i < gamepads.length; i++) {
      const pad = gamepads[i];
      if (pad) {
        gamepadLogger.info(`Gamepad already connected: ${pad.id}`);
      }
    }

    startPolling();

    return () => {
      window.removeEventListener("gamepadconnected", handleGamepadConnected);
      window.removeEventListener(
        "gamepaddisconnected",
        handleGamepadDisconnected
      );
      stopPolling();
    };
  }, [sendControl]);
};
