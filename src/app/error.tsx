"use client";

export default function Error() {
  return (
    <div className="flex h-[calc(100vh-var(--header-height)-32px)] items-center justify-center">
      <h2 className="flex flex-col items-center">
        <span className="text-[70px] leading-none font-bold text-[#b3b3b3]">
          500
        </span>
        <span className="text-[24px] text-[#b3b3b3]">Server Error</span>
      </h2>
    </div>
  );
}
