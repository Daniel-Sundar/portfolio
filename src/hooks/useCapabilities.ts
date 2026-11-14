import { useMemo } from 'react'
import { supportsWebGL2 } from '../lib/webgl'
import { useMediaQuery } from './useMediaQuery'

export interface Capabilities {
  reducedMotion: boolean
  /** Mouse or trackpad: hover effects and the cursor glow make sense. */
  finePointer: boolean
  /** Tablet width and up. */
  desktop: boolean
  webgl2: boolean
  /** Full 3D is worth running: wide screen, WebGL2, motion allowed. */
  rich3d: boolean
}

export function useCapabilities(): Capabilities {
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)')
  const desktop = useMediaQuery('(min-width: 768px)')
  const webgl2 = useMemo(() => supportsWebGL2(), [])
  return {
    reducedMotion,
    finePointer,
    desktop,
    webgl2,
    rich3d: desktop && webgl2 && !reducedMotion,
  }
}
