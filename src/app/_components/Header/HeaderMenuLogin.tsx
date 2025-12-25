"use client";

import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";

import { Loading } from "@/components";
import { useHeaderStore } from "./stores";

import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function HeaderMenuLogin() {
  const { getLoginUserResponse, isLoadingGetLoginUser } = useHeaderStore();

  return (
    <nav>
      <ul className="hidden gap-4 text-[14px] md:flex">
        <li>
          <Link
            href="/account"
            className="flex items-center gap-[2px] rounded-[4px] px-[6px] py-[4px] text-[#333] duration-200 hover:bg-[#f6f7f9]"
          >
            {isLoadingGetLoginUser ? (
              <Loading size="18px" />
            ) : (
              <>
                {getLoginUserResponse.result?.image ? (
                  <Image
                    src={getLoginUserResponse.result.image}
                    alt=""
                    width={20}
                    height={20}
                    className="w-5 rounded-full object-cover"
                  />
                ) : (
                  <AccountCircleIcon className="aspect-square !text-[20px] text-[#333]" />
                )}
                <span className="flex flex-row flex-nowrap gap-1">
                  <span className="line-clamp-1 max-w-[10em]">
                    {getLoginUserResponse.result?.name ?? "???"}
                  </span>
                </span>
              </>
            )}
          </Link>
        </li>
        <li>
          <span
            className="flex items-center gap-[2px] rounded-[4px] px-[6px] py-[4px] text-[#333] duration-200 hover:cursor-pointer hover:bg-[#f6f7f9]"
            onClick={() => {
              signOut({ callbackUrl: "/" });
            }}
          >
            <LogoutIcon className="aspect-square !text-[20px] text-[#333]" />
            ログアウト
          </span>
        </li>
      </ul>
    </nav>
  );
}
