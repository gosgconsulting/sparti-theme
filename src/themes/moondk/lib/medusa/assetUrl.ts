/** Resolve Medusa file/thumbnail paths to absolute URLs. */
export function medusaAssetUrl(path: string | null | undefined, baseUrl: string): string {
  if (!path || typeof path !== "string") return "";
  const trimmed = path.trim();
  if (!trimmed) return "";
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed;
  const base = baseUrl.replace(/\/+$/, "");
  return trimmed.startsWith("/") ? `${base}${trimmed}` : `${base}/${trimmed}`;
}
