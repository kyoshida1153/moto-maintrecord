"use client";

import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import LoginIcon from "@mui/icons-material/Login";

export default function HeaderMenuLogout() {
  return (
    <nav>
      <ul className="flex gap-2 text-[14px] md:gap-4">
        <li className="hidden sm:block">
          <Link
            href="/signup"
            className="flex items-center gap-[2px] rounded-[4px] px-[6px] py-[4px] whitespace-nowrap text-[#333] duration-200 hover:bg-[#f6f7f9]"
          >
            <AddIcon className="aspect-square !text-[20px] text-[#333]" />
            アカウント作成
          </Link>
        </li>
        <li>
          <Link
            href="/login"
            className="flex items-center gap-[2px] rounded-[4px] px-[6px] py-[4px] whitespace-nowrap text-[#333] duration-200 hover:bg-[#f6f7f9]"
          >
            <LoginIcon className="aspect-square !text-[20px] text-[#333]" />
            ログイン
          </Link>
        </li>
      </ul>
    </nav>
  );
}
