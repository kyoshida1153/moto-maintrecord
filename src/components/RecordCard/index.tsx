"use client";

import * as React from "react";
import Link from "next/link";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import CategoryIcon from "@mui/icons-material/Category";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditSquareIcon from "@mui/icons-material/EditSquare";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";

export default function RecordCard({
  id,
  name,
  category_id,
  category_name,
  bike_id,
  bike_name,
  cost,
}: {
  id: string;
  name: string;
  category_id: string;
  category_name: string;
  bike_id: string;
  bike_name: string;
  cost: string;
}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="flex flex-row flex-wrap items-center gap-2 rounded border border-solid border-[var(--border-color-gray)] bg-white px-3 py-2 text-[#333] md:flex-nowrap md:gap-4 md:px-4 md:py-3">
      <div className="flex w-full flex-row items-center gap-2 md:gap-4">
        <div className="flex flex-col gap-1">
          <h4 className="line-clamp-1 text-lg transition-opacity duration-200 hover:opacity-70 md:text-xl">
            <Link href={`/record/${id}`}>{name}</Link>
          </h4>
          <ul className="ml-auto hidden w-full flex-row flex-nowrap items-center justify-end gap-4 text-sm md:flex md:w-auto md:text-[15px]">
            <li>
              <Link
                href={`/category/${category_id}`}
                className="flex flex-row flex-nowrap items-center gap-0.5 whitespace-nowrap transition-opacity duration-200 hover:opacity-70"
              >
                <CategoryIcon className="!text-[20px]" />
                {category_name}
              </Link>
            </li>
            <li>
              <Link
                href={`/bike/${bike_id}`}
                className="flex flex-row flex-nowrap items-center gap-0.5 whitespace-nowrap transition-opacity duration-200 hover:opacity-70"
              >
                <TwoWheelerIcon className="!text-[24px]" />
                {bike_name}
              </Link>
            </li>
          </ul>
        </div>
        <div className="ml-auto whitespace-nowrap">
          <span className="font-alphanumeric text-xl md:text-2xl">{cost}</span>
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
            <MoreVertIcon className="!text-[24px]" />
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
                <EditSquareIcon className="!text-[18px]" />
                <span>編集する</span>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                href={`/record/${id}/duplicate`}
                className="flex items-center gap-1 text-[15px]"
              >
                <ContentCopyIcon className="!text-[18px]" />
                <span>コピーを作成</span>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                href={`/record/${id}/delete`}
                className="flex items-center gap-1 text-[15px]"
              >
                <DeleteIcon className="!text-[18px]" />
                <span>削除する</span>
              </Link>
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
}
