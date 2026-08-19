export default function AuroraBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-24 -top-24 h-[26rem] w-[26rem] animate-blob-a rounded-full bg-brand-400/40 blur-3xl" />
      <div className="absolute -right-16 top-10 h-[22rem] w-[22rem] animate-blob-b rounded-full bg-sun-400/35 blur-3xl" />
      <div className="absolute bottom-0 left-1/4 h-[24rem] w-[24rem] animate-blob-c rounded-full bg-brand-300/30 blur-3xl" />
      <div className="absolute -bottom-20 right-1/4 h-[20rem] w-[20rem] animate-blob-d rounded-full bg-sun-300/30 blur-3xl" />
      <div className="absolute inset-0 bg-white/40" />
    </div>
  );
}
