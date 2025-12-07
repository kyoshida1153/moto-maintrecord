"use client";

import { Breadcrumbs as MuiBreadcrumbs, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import HomeIcon from "@mui/icons-material/Home";

import { Loading } from "@/components";
import { useBreadcrumbsStore } from "./stores";

export function Breadcrumbs() {
  const { getBreadcrumbItems, isLoadingBreadcrumbs } = useBreadcrumbsStore();

  return (
    <>
      {isLoadingBreadcrumbs ? (
        <div className="flex w-full justify-center md:justify-start">
          <Loading size="24px" />
        </div>
      ) : Array.isArray(getBreadcrumbItems) && getBreadcrumbItems.length > 0 ? (
        <>
          <div role="presentation">
            <MuiBreadcrumbs
              aria-label="breadcrumb"
              sx={{
                "& .MuiBreadcrumbs-ol": {
                  whiteSpace: "nowrap",
                  overflowX: "scroll",
                  flexWrap: "nowrap",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                },
                "& .MuiBreadcrumbs-ol::-webkit-scrollbar": {
                  display: "none",
                },
                "& .MuiBreadcrumbs-li .MuiTypography-root": {
                  fontSize: "15px",
                },
              }}
            >
              <Link underline="hover" color="inherit" href="/">
                <HomeIcon fontSize="small" sx={{ marginTop: "-3px" }} />
              </Link>
              {getBreadcrumbItems.map((item, i) =>
                item.href ? (
                  <Link
                    underline="hover"
                    color="inherit"
                    href={item.href}
                    key={`key${i}_${item.text}`}
                  >
                    {item.text}
                  </Link>
                ) : (
                  <Typography
                    key={`key${i}_${item.text}`}
                    sx={{ color: "text.primary" }}
                  >
                    {item.text}
                  </Typography>
                ),
              )}
            </MuiBreadcrumbs>
          </div>
        </>
      ) : (
        <p>読み込みに失敗しました。</p>
      )}
    </>
  );
}
