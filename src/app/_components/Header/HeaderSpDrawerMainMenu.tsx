"use client";

import { tv } from "tailwind-variants";
import { usePathname } from "next/navigation";
import Link from "next/link";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BarChartIcon from "@mui/icons-material/BarChart";
import BuildIcon from "@mui/icons-material/Build";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";

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
      icon: (className?: string) => <CalendarMonthIcon className={className} />,
    },
    {
      id: 2,
      text: "整備・出費記録",
      href: "/record",
      icon: (className?: string) => <NoteAltIcon className={className} />,
    },
    {
      id: 3,
      text: "所有バイク",
      href: "/bike",
      icon: (className?: string) => <TwoWheelerIcon className={className} />,
    },
    {
      id: 4,
      text: "カテゴリー",
      href: "/category",
      icon: (className?: string) => <BuildIcon className={className} />,
    },
    {
      id: 5,
      text: "レポート",
      href: "/report",
      icon: (className?: string) => <BarChartIcon className={className} />,
    },
    {
      id: 6,
      text: "アカウント管理",
      href: "/account",
      icon: (className?: string) => <AccountCircleIcon className={className} />,
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
              {item.icon(tvLinkIcon({ currentFlag }))}
              <span className={tvLinkText({ currentFlag })}>{item.text}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
