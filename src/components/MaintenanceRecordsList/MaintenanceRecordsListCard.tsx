"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { tv } from "tailwind-variants";

import { Menu, MenuItem, IconButton } from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import BuildIcon from "@mui/icons-material/Build";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditSquareIcon from "@mui/icons-material/EditSquare";
// import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";

export default function MaintenanceRecordsListCard({
  id,
  title,
  categoryName,
  bikeName,
  bikeImageUrl,
  cost,
  isDone,
}: {
  id: string;
  title: string;
  categoryName: string;
  bikeName: string;
  bikeImageUrl: string;
  cost: number;
  isDone: boolean;
}) {
  // メニュー
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // 実施済
  const tvIsDone = tv({
    base: "flex items-center gap-0.5 rounded px-0 py-0.5 text-sm whitespace-nowrap",
    variants: {
      isDone: {
        initial: "",
        true: "text-[var(--icon-color-success)]",
        false: "text-[#808080]",
      },
    },
  });

  return (
    <div className="relative mt-2 w-full min-w-fit rounded border border-solid border-[var(--border-color-gray)] bg-white px-3 py-2 text-[#333] md:flex-nowrap md:gap-4 md:px-4 md:py-3">
      <div className="absolute top-0 left-1 -translate-y-3">
        <div className={tvIsDone({ isDone })}>
          {isDone ? (
            <>
              <CheckCircleIcon
                sx={{
                  color: "var(--icon-color-success)",
                  fontSize: "18px",
                }}
              />
              <span className="mb-[2px] leading-none">実施済</span>
            </>
          ) : (
            <>
              <ErrorIcon
                sx={{
                  color: "#808080",
                  fontSize: "18px",
                  borderRadius: "50%",
                }}
              />
              <span className="mb-[2px] leading-none">未実施</span>
            </>
          )}
        </div>
      </div>

      <div className="flex w-full flex-row items-center gap-2 md:gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="w-fit text-lg md:text-xl">
            <Link
              href={`/record/${id}`}
              className="flex items-center gap-2 text-[var(--link-color)] transition-opacity duration-200 hover:opacity-70"
            >
              <span className="w-[36px] min-w-[36px]">
                <Image
                  src={
                    bikeImageUrl ? bikeImageUrl : "/assets/img/bike-default.svg"
                  }
                  alt=""
                  width={36}
                  height={36}
                  className="aspect-square w-full rounded-full border border-gray-300 bg-white object-cover"
                />
              </span>
              <span className="line-clamp-3 leading-snug md:line-clamp-2">
                {title || "(タイトル無し)"}
              </span>
            </Link>
          </h3>

          <p className="mr-auto hidden w-full flex-row flex-nowrap items-center justify-end gap-2 text-sm leading-none text-[#808080] md:flex md:w-auto md:text-[15px]">
            <span className="flex items-center gap-0.5 whitespace-nowrap">
              <TwoWheelerIcon sx={{ fontSize: "20px", mt: "1px" }} />
              {bikeName || "未選択"}
            </span>
            <span> / </span>
            <span className="flex items-center gap-0.5 whitespace-nowrap">
              <BuildIcon sx={{ fontSize: "16px", mt: "1px" }} />
              {categoryName || "未選択"}
            </span>
          </p>
        </div>
        <div className="ml-auto whitespace-nowrap">
          <span className="font-alphanumeric text-xl md:text-2xl">
            {typeof cost === "number" ? cost.toLocaleString() : " - "}
          </span>
          <span className="ml-0.5 text-sm md:text-base">円</span>
        </div>
        <div>
          <IconButton
            id="positioned-button"
            aria-controls={open ? "positioned-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MoreVertIcon sx={{ fontSize: "24px" }} />
          </IconButton>
          <Menu
            id="positioned-menu"
            aria-labelledby="positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem>
              <Link
                href={`/record/${id}/edit`}
                className="flex items-center gap-1 text-[15px]"
              >
                <EditSquareIcon sx={{ fontSize: "18px" }} />
                <span>編集する</span>
              </Link>
            </MenuItem>
            {/* <MenuItem>
              <Link
                href={`/record/${id}/duplicate`}
                className="flex items-center gap-1 text-[15px]"
              >
                <ContentCopyIcon sx={{ fontSize: "18px" }} />
                <span>コピーを作成</span>
              </Link>
            </MenuItem> */}
            <MenuItem>
              <Link
                href={`/record/${id}/delete`}
                className="flex items-center gap-1 text-[15px]"
              >
                <DeleteIcon sx={{ fontSize: "18px" }} />
                <span>削除する</span>
              </Link>
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
}
