/**
 * Debug logging for development. Use instead of console.log('[testing]...')
 * so ESLint no-restricted-syntax is satisfied and production can no-op if needed.
 */

const isDev = typeof import.meta !== "undefined" && import.meta.env?.DEV;

export function debugLog(...args: unknown[]): void {
  if (isDev) {
    console.log(...args);
  }
}

export function debugError(...args: unknown[]): void {
  if (isDev) {
    console.error(...args);
  }
}

export function debugWarn(...args: unknown[]): void {
  if (isDev) {
    console.warn(...args);
  }
}
