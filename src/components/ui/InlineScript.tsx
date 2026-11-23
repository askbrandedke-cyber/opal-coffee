/**
 * Runs synchronously during HTML parsing (before first paint) on full page loads.
 * Pattern from the Next.js "Preventing flash before hydration" guide: the type
 * differs between server and client, and suppressHydrationWarning accepts the DOM.
 */
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
