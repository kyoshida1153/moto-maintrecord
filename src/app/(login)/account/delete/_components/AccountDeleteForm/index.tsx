"use client";

import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import WarningIcon from "@mui/icons-material/Warning";

export default function AccountDeleteForm() {
  const router = useRouter();

  return (
    <Box component="form" className="mt-6 md:mt-8">
      <div className="flex flex-col gap-4 md:gap-6">
        <div className="flex max-w-md items-center gap-2">
          <WarningIcon sx={{ fontSize: "42px", textAlign: "middle" }} />
          <p>
            アカウントの削除を行うと、登録した内容がすべて削除されます。元に戻すことはできません。
          </p>
        </div>
        <p className="my-4 text-center text-lg font-[500] md:text-left">
          アカウントを削除しますか？
        </p>
        <div className="flex justify-center gap-3 md:justify-start">
          <Button
            variant="outlined"
            disableElevation
            sx={{
              backgroundColor: "#fff",
              maxWidth: "fit-content",
              px: "1.5em",
              fontSize: "16px",
              whiteSpace: "nowrap",
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
              whiteSpace: "nowrap",
            }}
          >
            削除
          </Button>
        </div>
      </div>
    </Box>
  );
}
