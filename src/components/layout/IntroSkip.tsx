"use client";

/** Lets visitors dismiss the intro instantly (click, tap, or any key). */
export function IntroSkip() {
  const skip = () => {
    document.getElementById("opal-intro")?.classList.add("is-skipped");
    document.documentElement.style.setProperty("--intro-delay", "0ms");
  };
  return (
    <button
      type="button"
      onClick={skip}
      onKeyDown={skip}
      className="absolute inset-0 cursor-pointer"
      aria-label="Skip intro"
      tabIndex={-1}
    >
      <span className="eyebrow absolute bottom-8 left-1/2 -translate-x-1/2 text-ivory/40">Tap to skip</span>
    </button>
  );
}
