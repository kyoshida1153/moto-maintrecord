"use client";

const NotFound = () => {
  return (
    <div className="flex h-[calc(100vh-50px)] items-center justify-center">
      <h2 className="flex flex-col items-center">
        <span className="text-[70px] leading-none font-bold text-[#b3b3b3]">
          404
        </span>
        <span className="text-[24px] text-[#b3b3b3]">Not Found</span>
      </h2>
    </div>
  );
};

export default NotFound;
