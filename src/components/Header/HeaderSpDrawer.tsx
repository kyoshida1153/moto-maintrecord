"use client";

import { useEffect, useState } from "react";
import { tv } from "tailwind-variants";
import Link from "next/link";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import HeaderIcon from "./HeaderIcon";
import HeaderSpDrawerMainMenu from "./HeaderSpDrawerMainMenu";
import { useWindowSize } from "./hooks";
import { signOut } from "next-auth/react";

type Props = {
  userName: string;
};

export default function HeaderSpDrawer({ userName }: Props) {
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

  return (
    <nav className="block max-w-full md:hidden">
      <MenuIcon onClick={handleDrawerOpen} />
      <div
        className={tvBackdrop({ drawerStatus })}
        onClick={handleDrawerClose}
      ></div>
      <div className={tvDrawer({ drawerStatus })}>
        <div className="h-screen overflow-x-scroll p-2">
          <div className="mb-5 flex items-center justify-between gap-2.5 border-b border-gray-200 pb-2">
            <Link
              href="/account"
              onClick={handleDrawerClose}
              className="line-clamp-1 flex items-center gap-[5px] rounded-[4px] text-[#333] duration-200"
            >
              <HeaderIcon
                iconName="AccountCircleIcon"
                className="aspect-square !text-[24px] text-[#333]"
              />
              <span className="flex flex-row flex-nowrap gap-1 text-[14px]">
                <span className="line-clamp-1 max-w-[8em]">{userName}</span>
                さん
              </span>
            </Link>
            <CloseIcon onClick={handleDrawerClose} />
          </div>

          <HeaderSpDrawerMainMenu handleDrawerClose={handleDrawerClose} />

          <div className="mt-5 flex justify-center border-t border-gray-200 pt-5">
            <span
              className="flex items-center gap-[2px] rounded-[4px] px-[6px] py-[4px] text-[#333] duration-200 hover:bg-[#f6f7f9]"
              onClick={() => {
                signOut({ callbackUrl: "/" });
              }}
            >
              <HeaderIcon
                iconName="LogoutIcon"
                className="aspect-square !text-[20px] text-[#333]"
              />
              ログアウト
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
