"use client";

import Image from "next/image";
import Link from "next/link";
import HeaderSpDrawer from "./HeaderSpDrawer";
import HeaderMenuLogin from "./HeaderMenuLogin";
import HeaderMenuLogout from "./HeaderMenuLogout";

export default function Header({ loginStatus }: { loginStatus: boolean }) {
  return (
    <header className="sticky top-0 z-100 flex w-full flex-row items-center justify-between !overflow-x-clip bg-[#fff] px-[16px] py-[8px] [border-bottom:solid_1px_#e9ecef]">
      <Link href="/">
        <Image src="/sitelogo.png" width={90} height={30} alt="" priority />
      </Link>
      {loginStatus === true ? <HeaderMenuLogin /> : <HeaderMenuLogout />}
      {loginStatus === true && <HeaderSpDrawer />}
    </header>
  );
}
