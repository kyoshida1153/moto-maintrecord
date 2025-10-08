"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputFileImage from "../InputFileImage";

export default function BikeCreateForm() {
  return (
    <div className="">
      <div className="w-full max-w-lg">
        <Box component="form" className="mt-6 md:mt-8">
          <div className="flex flex-col gap-4 md:gap-6">
            <InputFileImage
              name="image_url"
              multiple={false}
              label="バイクの写真"
            />
            <TextField id="name" label="バイクの名前" type="text" name="name" />
            <TextField
              id="mileage_km"
              label="毎月の走行距離（km）"
              type="number"
              name="mileage_km"
            />
            <TextField
              id="memo"
              label="メモ"
              multiline
              rows={4}
              name="memo"
              defaultValue=""
            />
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
