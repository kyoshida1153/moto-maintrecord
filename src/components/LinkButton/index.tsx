"use client";

import { Button } from "@mui/material";
import Link from "@mui/material/Link";

export function LinkButton({
  children,
  variant = "text",
  disabled,
  href,
  onClick,
}: {
  children: string;
  variant: "text" | "contained" | "outlined";
  disabled?: boolean;
  href: string;
  onClick?: () => void;
}) {
  return (
    <Button
      component={Link}
      variant={variant}
      disableElevation
      type="submit"
      href={href}
      sx={{
        backgroundColor: "#fff",
        fontSize: "16px",
        px: "1.5em",
        whiteSpace: "nowrap",
      }}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
