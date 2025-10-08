"use client";

import SidebarMainMenu from "./SidebarMainMenu";

export default function Sidebar() {
  return (
    <nav className="fixed h-full w-[220px] overflow-y-visible bg-[#fff] [border-right:1px_solid_#e9ecef]">
      <div className="p-[16px]">
        <SidebarMainMenu />
      </div>
    </nav>
  );
}
