"use client";

export default function Error() {
  return (
    <div className="flex h-[100vh] items-center justify-center">
      <h2 className="flex flex-col items-center">
        <span className="font-alphanumeric text-[100px] leading-none font-bold text-[#b3b3b3]">
          500
        </span>
        <span className="text-[34px] leading-none text-[#b3b3b3]">
          Server Error
        </span>
      </h2>
    </div>
  );
}
