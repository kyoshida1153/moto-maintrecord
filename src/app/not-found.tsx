"use client";

export default function NotFound() {
  return (
    <div className="flex h-[calc(100vh-(var(--header-height)+48px))] items-center justify-center md:h-[calc(100vh-(var(--header-height)+64px))]">
      <h2 className="flex flex-col items-center">
        <span className="text-[70px] leading-none font-bold text-[#b3b3b3]">
          404
        </span>
        <span className="text-[24px] text-[#b3b3b3]">Not Found</span>
      </h2>
    </div>
  );
}
