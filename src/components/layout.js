// Shared safe-area so content never collides with the persistent logo
// (top-left) or navigation/progress chrome (bottom) rendered by
// PresentationShell.
export const SAFE = {
  top: 168,
  bottom: 172,
  side: 120,
}

// Tighter insets for the fluid mobile stage (stage = viewport, scale 1).
export const SAFE_MOBILE = {
  top: 72,
  bottom: 100,
  side: 20,
}

export function safeInsets(isMobile) {
  return isMobile ? SAFE_MOBILE : SAFE
}
