"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Prisma } from "@prisma/client";

import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditSquareIcon from "@mui/icons-material/EditSquare";
import DeleteIcon from "@mui/icons-material/Delete";

type Bike = Prisma.BikeGetPayload<{
  select: {
    id: true;
    name: true;
    mileage: true;
    imageUrl: true;
  };
}>;

export default function BikeListCard({ id, name, mileage, imageUrl }: Bike) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="flex flex-row flex-nowrap items-center gap-2 rounded border border-solid border-[var(--border-color-gray)] bg-white px-3 py-2 text-[#333] md:gap-4 md:px-4 md:py-3">
      <div className="flex w-full flex-row items-center gap-2 md:gap-4">
        <span className="w-[50px] min-w-[50px]">
          <Image
            src={imageUrl ? imageUrl : "/assets/img/bike-default.svg"}
            alt=""
            width={160}
            height={160}
            className="aspect-square w-full rounded-full border border-gray-300 bg-white object-cover"
          />
        </span>
        <div className="flex flex-col gap-1">
          <h2 className="line-clamp-1 text-lg md:text-xl">
            <Link
              href={`/bike/${id}`}
              className="text-[var(--link-color)] transition-opacity duration-200 hover:opacity-70"
            >
              {name}
            </Link>
          </h2>
          <p className="text-sm">
            毎月の走行距離：{" "}
            {typeof mileage === "number" ? (
              <>
                <span className="font-alphanumeric mr-0.5 text-base">
                  {mileage.toLocaleString()}
                </span>
                km
              </>
            ) : (
              <>未入力</>
            )}
          </p>
        </div>
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
              href={`/bike/${id}/edit`}
              className="flex items-center gap-1 text-[15px]"
            >
              <EditSquareIcon sx={{ fontSize: "18px" }} />
              <span>編集する</span>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              href={`/bike/${id}/delete`}
              className="flex items-center gap-1 text-[15px]"
            >
              <DeleteIcon sx={{ fontSize: "18px" }} />
              <span>削除する</span>
            </Link>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}
