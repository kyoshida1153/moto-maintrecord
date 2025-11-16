"use client";

import { tv } from "tailwind-variants";
import { usePathname } from "next/navigation";
import Link from "next/link";
import HeaderIcon from "./HeaderIcon";

export default function HeaderSpDrawerMainMenu({
  handleDrawerClose,
}: {
  handleDrawerClose: () => void;
}) {
  const linkList = [
    {
      id: 1,
      text: "カレンダー",
      href: "/top",
      iconName: "CalendarMonthIcon",
    },
    {
      id: 2,
      text: "整備・出費記録",
      href: "/record",
      iconName: "NoteAltIcon",
    },
    {
      id: 3,
      text: "所有バイク",
      href: "/bike",
      iconName: "TwoWheelerIcon",
    },
    {
      id: 4,
      text: "カテゴリー",
      href: "/category",
      iconName: "BuildIcon",
    },
    {
      id: 5,
      text: "レポート",
      href: "/report",
      iconName: "BarChartIcon",
    },
  ];

  const tvLink = tv({
    base: "group flex items-center gap-2 rounded-[4px] px-4 py-2 duration-200 hover:bg-[#f6f7f9]",
    variants: {
      currentFlag: {
        true: "bg-[#f6f7f9]",
      },
    },
  });

  const tvLinkIcon = tv({
    base: "text-[#8d969f] group-hover:text-[#0284c7]",
    variants: {
      currentFlag: {
        true: "text-[#0284c7]",
      },
    },
  });

  const tvLinkText = tv({
    base: "text-[16px] font-[500] text-[#383d42] group-hover:text-[#000]",
    variants: {
      currentFlag: {
        true: "text-[#000]",
      },
    },
  });

  const pathname = usePathname();

  return (
    <ul className="flex w-full flex-col gap-1">
      {linkList.map((item) => {
        const currentFlag =
          item.href === "/"
            ? item.href === pathname
            : pathname.startsWith(item.href);
        return (
          <li key={item.id}>
            <Link
              href={item.href}
              className={tvLink({ currentFlag })}
              onClick={handleDrawerClose}
            >
              <HeaderIcon
                iconName={item.iconName}
                className={tvLinkIcon({ currentFlag })}
              />
              <span className={tvLinkText({ currentFlag })}>{item.text}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
