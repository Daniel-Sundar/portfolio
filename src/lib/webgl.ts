let cached: boolean | null = null

/** True when the browser can create a WebGL2 context. Checked once. */
export function supportsWebGL2(): boolean {
  if (cached !== null) return cached
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl2')
    cached = !!gl
    gl?.getExtension('WEBGL_lose_context')?.loseContext()
  } catch {
    cached = false
  }
  return cached
}
