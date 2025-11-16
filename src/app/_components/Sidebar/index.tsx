"use client";

import SidebarMainMenu from "./SidebarMainMenu";

export default function Sidebar({ isLogin }: { isLogin: boolean }) {
  return (
    isLogin && (
      <nav className="fixed h-full w-[220px] overflow-y-visible bg-[#fff] [border-right:1px_solid_var(--border-color-gray)]">
        <div className="p-[16px]">
          <SidebarMainMenu />
        </div>
      </nav>
    )
  );
}
