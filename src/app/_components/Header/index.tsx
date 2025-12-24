"use client";

import Image from "next/image";
import Link from "next/link";
import HeaderSpDrawer from "./HeaderSpDrawer";
import HeaderMenuLogin from "./HeaderMenuLogin";
import HeaderMenuLogout from "./HeaderMenuLogout";

export default function Header({ isLogin }: { isLogin: boolean }) {
  return (
    <header className="sticky top-0 z-100 flex h-[50px] w-full flex-row items-center justify-between !overflow-x-clip bg-[#fff] px-[16px] py-[8px] [border-bottom:solid_1px_var(--border-color-gray)]">
      <Link href="/" className="flex flex-col whitespace-nowrap">
        <span className="flex items-start gap-1 text-center text-[20px] leading-none font-[600] tracking-[-0.5px] text-[#1a8dc5]">
          <Image
            src="/assets/img/logo.svg"
            width={220}
            height={20}
            alt={process.env.NEXT_PUBLIC_APP_NAME || ""}
            priority
          />
        </span>
        <span className="text-[14px] leading-none text-[#1E4051]">
          {process.env.NEXT_PUBLIC_APP_NAME_SUB}
        </span>
      </Link>
      {isLogin ? <HeaderMenuLogin /> : <HeaderMenuLogout />}
      {isLogin && <HeaderSpDrawer />}
    </header>
  );
}
