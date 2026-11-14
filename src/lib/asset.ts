/** Resolve a file in /public against the deployed base path (e.g. /portfolio/ on GitHub Pages). */
export const asset = (path: string): string => import.meta.env.BASE_URL + path.replace(/^\//, '')
