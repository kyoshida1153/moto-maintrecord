"use client";

import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";

export default function BikeDeleteForm() {
  const router = useRouter();

  return (
    <Box component="form" className="mt-6 md:mt-8">
      <div className="flex flex-col gap-4 md:gap-6">
        <p>カテゴリー「メンテナンス」を削除しますか？</p>
        <div className="flex justify-center gap-3 md:justify-start">
          <Button
            variant="outlined"
            disableElevation
            sx={{
              backgroundColor: "#fff",
              maxWidth: "fit-content",
              px: "1.5em",
              fontSize: "16px",
            }}
            onClick={router.back}
          >
            キャンセル
          </Button>
          <Button
            variant="contained"
            disableElevation
            type="submit"
            sx={{
              maxWidth: "fit-content",
              px: "1.5em",
              fontSize: "16px",
            }}
          >
            削除
          </Button>
        </div>
      </div>
    </Box>
  );
}
