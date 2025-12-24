"use client";

import { Button } from "@mui/material";
import Link from "@mui/material/Link";
import { ReactElement } from "react";

export function LinkButton({
  children,
  disabled,
  endIcon,
  href,
  onClick,
  startIcon,
  variant = "text",
  sx,
}: {
  children: string;
  disabled?: boolean;
  endIcon?: ReactElement;
  href: string;
  startIcon?: ReactElement;
  variant: "text" | "contained" | "outlined";
  onClick?: () => void;
  sx?: object;
}) {
  return (
    <Button
      component={Link}
      variant={variant}
      disableElevation
      type="submit"
      endIcon={endIcon}
      href={href}
      startIcon={startIcon}
      sx={{
        fontSize: "16px",
        whiteSpace: "nowrap",
        "&.MuiButton-outlined": {
          backgroundColor: "#fff",
        },
        ...sx,
      }}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
