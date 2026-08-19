export default function Logo({
  size = "md",
  onDark = false,
  logoUrl,
  namaBrand,
}: {
  size?: "sm" | "md" | "lg";
  onDark?: boolean;
  logoUrl?: string | null;
  namaBrand?: string | null;
}) {
  const dims = { sm: 26, md: 30, lg: 36 }[size];
  const textSize = { sm: "text-base", md: "text-lg", lg: "text-2xl" }[size];

  if (logoUrl) {
    return (
      <span className="inline-flex items-center" style={{ height: dims * 1.6 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoUrl} alt={namaBrand ?? "Logo"} className="h-full w-auto object-contain" />
      </span>
    );
  }

  const brand = namaBrand ?? "EnglishKu";
  const brandMain = brand.length > 2 ? brand.slice(0, -2) : brand;
  const brandTail = brand.length > 2 ? brand.slice(-2) : "";

  return (
    <span className="inline-flex items-center gap-2">
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
            <stop stopColor="#059669" />
            <stop offset="1" stopColor="#34D399" />
          </linearGradient>
        </defs>
      </svg>
      <span className={`font-display ${textSize} font-extrabold ${onDark ? "text-white" : "text-forest-900"}`}>
        {brandMain}<span className="text-brand-500">{brandTail}</span>
      </span>
    </span>
  );
}
