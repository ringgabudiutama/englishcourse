export default function Logo({
  size = "md",
  onDark = false,
}: {
  size?: "sm" | "md" | "lg";
  onDark?: boolean;
}) {
  const dims = { sm: 26, md: 30, lg: 36 }[size];
  const textSize = { sm: "text-base", md: "text-lg", lg: "text-2xl" }[size];

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
            <stop stopColor="#D4152C" />
            <stop offset="1" stopColor="#FF5A36" />
          </linearGradient>
        </defs>
      </svg>
      <span className={`font-display ${textSize} font-extrabold ${onDark ? "text-white" : "text-ink-900"}`}>
        English<span className="text-brand-600">Ku</span>
      </span>
    </span>
  );
}
