export default function Logo({
  size = "md",
  onDark = false,
  url,
  name,
}: {
  size?: "sm" | "md" | "lg";
  onDark?: boolean;
  /** Custom logo image URL from admin settings — falls back to the default mark when empty. */
  url?: string | null;
  /** Custom brand name — falls back to "EnglishKu" when empty. */
  name?: string | null;
}) {
  const dims = { sm: 26, md: 30, lg: 36 }[size];
  const textSize = { sm: "text-base", md: "text-lg", lg: "text-2xl" }[size];

  return (
    <span className="inline-flex items-center gap-2">
      {url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={url}
          alt={name || "Logo"}
          width={dims}
          height={dims}
          style={{ width: dims, height: dims }}
          className="shrink-0 rounded-lg object-contain"
        />
      ) : (
        <svg width={dims} height={dims} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="32" height="32" rx="9" fill="url(#englishku-logo-grad)" />
          <path
            d="M9 22V10h10M9 16h7"
            stroke="white"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient id="englishku-logo-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
              <stop stopColor="#D4152C" />
              <stop offset="1" stopColor="#FF5A36" />
            </linearGradient>
          </defs>
        </svg>
      )}
      {name ? (
        <span className={`font-display ${textSize} font-extrabold ${onDark ? "text-white" : "text-ink-900"}`}>
          {name}
        </span>
      ) : (
        <span className={`font-display ${textSize} font-extrabold ${onDark ? "text-white" : "text-ink-900"}`}>
          English<span className="text-brand-600">Ku</span>
        </span>
      )}
    </span>
  );
}
