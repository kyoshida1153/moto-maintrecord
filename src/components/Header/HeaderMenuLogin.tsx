"use client";

import Link from "next/link";
import HeaderIcon from "./HeaderIcon";

export default function HeaderMenuLogin() {
  return (
    <nav>
      <ul className="hidden gap-4 text-[14px] md:flex">
        <li>
          <Link
            href="/account"
            className="flex items-center gap-[2px] rounded-[4px] px-[6px] py-[4px] text-[#333] duration-200 hover:bg-[#f6f7f9]"
          >
            <HeaderIcon
              iconName="AccountCircleIcon"
              className="aspect-square !text-[20px] text-[#333]"
            />
            <span className="flex flex-row flex-nowrap gap-1">
              <span className="line-clamp-1 max-w-[8em]">山田太郎</span>
              さん
            </span>
          </Link>
        </li>
        <li>
          <Link
            href="/logout"
            className="flex items-center gap-[2px] rounded-[4px] px-[6px] py-[4px] text-[#333] duration-200 hover:bg-[#f6f7f9]"
          >
            <HeaderIcon
              iconName="LogoutIcon"
              className="aspect-square !text-[20px] text-[#333]"
            />
            ログアウト
          </Link>
        </li>
      </ul>
    </nav>
  );
}
