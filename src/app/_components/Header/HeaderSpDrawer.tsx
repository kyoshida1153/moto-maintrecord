"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { tv } from "tailwind-variants";

import { Loading } from "@/components";
import HeaderSpDrawerMainMenu from "./HeaderSpDrawerMainMenu";
import { useWindowSize } from "./hooks";
import { useHeaderStore } from "./stores";

import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";

if (!process.env.NEXT_PUBLIC_AUTHER_NAME) {
  throw new Error("NEXT_PUBLIC_AUTHER_NAMEが設定されていません。");
}
const autherName = process.env.NEXT_PUBLIC_AUTHER_NAME;

if (!process.env.NEXT_PUBLIC_AUTHER_EMAIL) {
  throw new Error("NEXT_PUBLIC_AUTHER_EMAILが設定されていません。");
}
const autherEmail = process.env.NEXT_PUBLIC_AUTHER_EMAIL;

export default function HeaderSpDrawer() {
  const [drawerStatus, setDrawerStatus] = useState<
    "initial" | "open" | "close"
  >("initial");

  const handleDrawerOpen = (): void => {
    setDrawerStatus("open");
    document.body.classList.add("overflow-y-clip");
  };

  const handleDrawerClose = (): void => {
    setDrawerStatus("close");
    document.body.classList.remove("overflow-y-clip");
  };

  const tvBackdrop = tv({
    base: "z-200 absolute top-0 left-0 h-screen w-screen bg-black/50 backdrop-blur-[1px]",
    variants: {
      drawerStatus: {
        initial: "hidden",
        open: "animate-drawer-open-backdrop",
        close: "animate-drawer-close-backdrop",
      },
    },
  });

  const tvDrawer = tv({
    base: "z-300 absolute top-0 right-0 bg-white w-[250px] h-[100vh]",
    variants: {
      drawerStatus: {
        initial: "hidden translate-x-[250px]",
        open: "animate-drawer-open",
        close: "animate-drawer-close",
      },
    },
  });

  const [windowSizeWidth] = useWindowSize();

  useEffect(() => {
    if (windowSizeWidth > 768) setDrawerStatus("initial");
  }, [windowSizeWidth]);

  const { getLoginUserResponse, isLoadingGetLoginUser } = useHeaderStore();

  return (
    <nav className="block max-w-full md:hidden">
      <MenuIcon onClick={handleDrawerOpen} />
      <div
        className={tvBackdrop({ drawerStatus })}
        onClick={handleDrawerClose}
      ></div>
      <div className={tvDrawer({ drawerStatus })}>
        <div className="flex h-screen flex-col overflow-x-scroll p-2">
          <div className="mb-5 flex items-center justify-between gap-2.5 border-b border-gray-200 pb-2">
            <Link
              href="/account"
              onClick={handleDrawerClose}
              className="line-clamp-1 flex items-center gap-[5px] rounded-[4px] text-[#333] duration-200"
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
                    <AccountCircleIcon className="aspect-square !text-[24px] text-[#333]" />
                  )}
                  <span className="flex flex-row flex-nowrap gap-1 text-[14px]">
                    <span className="line-clamp-1 max-w-[10em]">
                      {getLoginUserResponse.result?.name ?? "???"}
                    </span>
                  </span>
                </>
              )}
            </Link>
            <CloseIcon onClick={handleDrawerClose} />
          </div>

          <HeaderSpDrawerMainMenu handleDrawerClose={handleDrawerClose} />

          <div className="mt-5 flex justify-center border-t-1 border-solid border-gray-200 pt-5">
            <span
              className="flex items-center gap-[2px] rounded-[4px] px-[6px] py-[4px] text-[#333] duration-200 hover:bg-[#f6f7f9]"
              onClick={() => {
                signOut({ callbackUrl: "/" });
              }}
            >
              <LogoutIcon className="aspect-square !text-[20px] text-[#333]" />
              ログアウト
            </span>
          </div>

          <div className="mt-auto border-t-1 border-solid border-gray-200 p-4">
            <div className="flex flex-col gap-3">
              <address className="flex flex-col gap-1 py-2 leading-none not-italic">
                <span className="flex flex-row flex-nowrap items-center gap-0.5 text-sm">
                  <MailOutlineIcon sx={{ fontSize: "16px", mt: "2px" }} />
                  お問い合わせ:
                </span>
                <span className="text-[13px]">{autherEmail}</span>
              </address>
              <div className="text-[13px] text-gray-500">
                &copy; {autherName}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
