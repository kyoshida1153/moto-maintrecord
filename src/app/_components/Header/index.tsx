"use client";

import Image from "next/image";
import Link from "next/link";
import HeaderSpDrawer from "./HeaderSpDrawer";
import HeaderMenuLogin from "./HeaderMenuLogin";
import HeaderMenuLogout from "./HeaderMenuLogout";

export default function Header({ isLogin }: { isLogin: boolean }) {
  return (
    <header className="sticky top-0 z-100 flex w-full flex-row items-center justify-between !overflow-x-clip bg-[#fff] px-[16px] py-[8px] [border-bottom:solid_1px_var(--border-color-gray)]">
      <Link href="/" className="flex flex-col whitespace-nowrap">
        <span className="flex items-start gap-1 text-center text-[20px] leading-none font-[600] tracking-[-0.5px] text-[#1a8dc5]">
          <Image
            src="/assets/img/logo-66x40.png"
            width={33}
            height={20}
            alt=""
            priority
          />
          {process.env.NEXT_PUBLIC_APP_NAME}
        </span>
        <span className="text-[13px] leading-none text-[#333]">
          {process.env.NEXT_PUBLIC_APP_NAME_SUB}
        </span>
      </Link>
      {isLogin ? <HeaderMenuLogin /> : <HeaderMenuLogout />}
      {isLogin && <HeaderSpDrawer />}
    </header>
  );
}
