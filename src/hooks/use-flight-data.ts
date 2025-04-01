import { useEffect, useState } from "react";

interface FlightDataProps {
    airspeed_kts: number;
    true_airspeed_kts: number;
    altitude_ft: number;
    target_altitude_ft: number;
    altimeter_pressure_setting_inhg: number;
    vertical_speed_fps: number;
    pitch_deg: number;
    roll_deg: number;
    side_slip_fps2: number;
    heading_deg: number;
    hsi_course_select_heading_deg: number;
    hsi_course_deviation_deg: number;
    hsi_mode: number;
}

const defaultFlightData = {
    airspeed_kts: 0,
    true_airspeed_kts: 0,
    altitude_ft: 0,
    target_altitude_ft: 0,
    altimeter_pressure_setting_inhg: 0,
    vertical_speed_fps: 0,
    pitch_deg: 0,
    roll_deg: 0,
    side_slip_fps2: 0,
    heading_deg: 0,
    hsi_course_select_heading_deg: 0,
    hsi_course_deviation_deg: 0,
    hsi_mode: 0,
}

export const useFlightData = () => {
    const wsUrl = "ws://localhost:5003/";
    const [flightData, setFlightData] = useState<FlightDataProps>(defaultFlightData);

    useEffect(() => {
        const ws = new WebSocket(wsUrl);

        ws.onopen = () => console.log("WebSocket connected");
        ws.onerror = (error) => console.error("WebSocket error:", error);
        ws.onclose = () => console.log("WebSocket disconnected");

        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                setFlightData(data);
            } catch (error) {
                console.error("Error parsing WebSocket message:", error);
            }
        };

        return () => ws.close();
    }, [wsUrl]);

    return flightData;
};