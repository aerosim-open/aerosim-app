import { useEffect } from "react";

export const useKeyboardInput = (sendControl: (command: string, value: number, source: string) => void) => {
    useEffect(() => {
        const keyMap: Record<string, [string, number]> = {
            ArrowUp: ["airspeed_setpoint_kts", +1],
            ArrowDown: ["airspeed_setpoint_kts", -1],
            "a": ["heading_setpoint_deg", -1],
            "d": ["heading_setpoint_deg", +1],
            "w": ["altitude_setpoint_ft", +1],
            "s": ["altitude_setpoint_ft", -1],
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            const commandInfo = keyMap[event.key];
            if (commandInfo) {
                const [command, value] = commandInfo;
                sendControl(command, value, "keyboard");
                console.log(`Sending command: ${command}, Value: ${value}, Source: keyboard`);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [sendControl]);
};
