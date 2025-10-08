"use client";

import Link from "next/link";
import HeaderIcon from "./HeaderIcon";

export default function HeaderMenuLogout() {
  return (
    <nav>
      <ul className="flex gap-2 text-[14px] md:gap-4">
        <li>
          <Link
            href="/signup"
            className="flex items-center gap-[2px] rounded-[4px] px-[6px] py-[4px] text-[#333] duration-200 hover:bg-[#f6f7f9]"
          >
            <HeaderIcon
              iconName="AddIcon"
              className="aspect-square !text-[20px] text-[#333]"
            />
            アカウント作成
          </Link>
        </li>
        <li>
          <Link
            href="/login"
            className="flex items-center gap-[2px] rounded-[4px] px-[6px] py-[4px] text-[#333] duration-200 hover:bg-[#f6f7f9]"
          >
            <HeaderIcon
              iconName="LoginIcon"
              className="aspect-square !text-[20px] text-[#333]"
            />
            ログイン
          </Link>
        </li>
      </ul>
    </nav>
  );
}
