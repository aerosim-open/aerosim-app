/**
 * Logger utility for consistent logging across the application
 * Provides categorized logging with throttling to prevent console spam
 */

// Store the last log time for each category to enable throttling
const lastLogTimes: Record<string, number> = {};

// Default throttle time in milliseconds (5 seconds)
const DEFAULT_THROTTLE_TIME = 5000;

/**
 * Log a message with optional throttling
 * @param category The log category (e.g., 'Gamepad', 'WebSocket')
 * @param message The message to log
 * @param level The log level ('log', 'warn', 'error', 'info')
 * @param throttleTime Time in ms to throttle similar messages (0 to disable throttling)
 * @returns boolean indicating if the message was logged
 */
export function log(
  category: string,
  message: string | object,
  level: 'log' | 'warn' | 'error' | 'info' = 'log',
  throttleTime: number = 0
): boolean {
  const now = Date.now();
  const categoryKey = `${category}-${level}-${typeof message === 'string' ? message : JSON.stringify(message)}`;
  
  // Check if we should throttle this message
  if (throttleTime > 0 && 
      lastLogTimes[categoryKey] && 
      now - lastLogTimes[categoryKey] < throttleTime) {
    return false;
  }
  
  // Format the message
  const formattedMessage = typeof message === 'string' 
    ? `[${category}] ${message}`
    : message;
  
  // Log the message with the appropriate level
  switch (level) {
    case 'warn':
      console.warn(formattedMessage);
      break;
    case 'error':
      console.error(formattedMessage);
      break;
    case 'info':
      console.info(formattedMessage);
      break;
    default:
      console.log(formattedMessage);
  }
  
  // Update the last log time for this category
  lastLogTimes[categoryKey] = now;
  return true;
}

/**
 * Clear all console logs
 */
export function clearLogs(): void {
  console.clear();
}

/**
 * Specialized logger for gamepad events
 */
export const gamepadLogger = {
  info: (message: string, throttle = 0) => log('Gamepad', message, 'info', throttle),
  warn: (message: string, throttle = 0) => log('Gamepad', message, 'warn', throttle),
  error: (message: string, throttle = 0) => log('Gamepad', message, 'error', throttle),
  axisChange: (axis: string, value: number, throttle = 0) => 
    log('Gamepad', `Axis ${axis}: ${value.toFixed(2)}`, 'log', throttle),
  buttonPress: (button: string, value: number) => 
    log('Gamepad', `Button ${button}: ${value}`, 'log', 0),
  status: (message: string) => log('Gamepad', message, 'info', DEFAULT_THROTTLE_TIME)
};

/**
 * Specialized logger for WebSocket events
 */
export const wsLogger = {
  info: (message: string, throttle = 0) => log('WebSocket', message, 'info', throttle),
  warn: (message: string, throttle = 0) => log('WebSocket', message, 'warn', throttle),
  error: (message: string | object, throttle = 0) => log('WebSocket', message, 'error', throttle),
  status: (message: string) => log('WebSocket', message, 'info', 0),
  command: (payload: object, throttle = 0) => log('Input', payload, 'log', throttle)
};
