"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function CategoryCreateForm() {
  return (
    <div className="">
      <div className="w-full max-w-lg">
        <Box component="form" className="mt-6 md:mt-8">
          <div className="flex flex-col gap-4 md:gap-6">
            <TextField id="name" label="カテゴリー名" type="text" name="name" />
            <Button
              variant="contained"
              disableElevation
              className="mt-6 !ml-auto max-w-fit !px-[1.5em] md:mt-8 md:!text-[16px]"
              type="submit"
            >
              登録
            </Button>
          </div>
        </Box>
      </div>
    </div>
  );
}
