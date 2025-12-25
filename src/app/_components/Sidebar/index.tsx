"use client";

import SidebarMainMenu from "./SidebarMainMenu";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

if (!process.env.NEXT_PUBLIC_AUTHER_NAME) {
  throw new Error("NEXT_PUBLIC_AUTHER_NAMEが設定されていません。");
}
const autherName = process.env.NEXT_PUBLIC_AUTHER_NAME;

if (!process.env.NEXT_PUBLIC_AUTHER_EMAIL) {
  throw new Error("NEXT_PUBLIC_AUTHER_EMAILが設定されていません。");
}
const autherEmail = process.env.NEXT_PUBLIC_AUTHER_EMAIL;

export default function Sidebar({ isLogin }: { isLogin: boolean }) {
  return (
    isLogin && (
      <aside className="fixed flex h-[calc(100vh-var(--header-height))] w-[220px] flex-col overflow-y-visible bg-[#fff] [border-right:1px_solid_var(--border-color-gray)]">
        <nav className="m-4">
          <SidebarMainMenu />
        </nav>
        <div className="m-4 mt-auto border-t-1 border-solid border-[var(--border-color-gray)] pt-4">
          <div className="flex flex-col gap-3">
            <address className="flex flex-col gap-1 py-2 leading-none not-italic">
              <span className="flex flex-row flex-nowrap items-center gap-0.5 text-sm">
                <MailOutlineIcon sx={{ fontSize: "16px", mt: "2px" }} />
                お問い合わせ:
              </span>
              <span className="text-[13px]">{autherEmail}</span>
            </address>
            <div className="text-[13px] text-gray-500">&copy; {autherName}</div>
          </div>
        </div>
      </aside>
    )
  );
}
