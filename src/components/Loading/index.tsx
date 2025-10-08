"use client";

import CircularProgress from "@mui/material/CircularProgress";

export default function Loading({ size }: { size?: string }) {
  return <CircularProgress enableTrackSlot={true} size={size} />;
}
