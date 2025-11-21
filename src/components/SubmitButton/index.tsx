"use client";

import { Button } from "@mui/material";
import { Loading } from "../Loading";

export function SubmitButton({
  variant = "text",
  labels = {
    default: "送信",
    isSubmitting: "送信中",
    isSubmitSuccessful: "送信完了",
  },
  isSubmitting,
  isSubmitSuccessful,
}: {
  variant: "text" | "contained" | "outlined";
  labels?: {
    default: string;
    isSubmitting: string;
    isSubmitSuccessful: string;
  };
  isSubmitting?: boolean;
  isSubmitSuccessful?: boolean;
}) {
  return (
    <Button
      variant={variant}
      disableElevation
      type="submit"
      sx={{
        fontSize: "16px",
        px: "1.5em",
        display: "flex",
        gap: "0.25em",
        whiteSpace: "nowrap",
      }}
      disabled={isSubmitting || isSubmitSuccessful}
    >
      {isSubmitting ? <Loading size="18px" /> : ""}
      {isSubmitting ? <>{labels.isSubmitting}</> : ""}
      {isSubmitSuccessful ? <>{labels.isSubmitSuccessful}</> : ""}
      {!isSubmitting && !isSubmitSuccessful ? <>{labels.default}</> : ""}
    </Button>
  );
}
