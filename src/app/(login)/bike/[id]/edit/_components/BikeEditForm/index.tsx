"use client";

import InputFileImage from "@/components/InputFileImage";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function BikeEditForm() {
  return (
    <div className="w-full max-w-lg">
      <Box component="form" className="mt-6 md:mt-8">
        <div className="flex flex-col gap-4 md:gap-6">
          {/* あとでやる: 選択された画像の表示 */}
          <InputFileImage
            name="image_url"
            multiple={false}
            label="バイクの写真"
          />
          <TextField
            id="name"
            label="バイクの名前"
            type="text"
            name="name"
            sx={{ backgroundColor: "#fff" }}
            defaultValue={"Ninja250"}
          />
          <TextField
            id="mileage_km"
            label="毎月の走行距離（km）"
            type="number"
            name="mileage_km"
            sx={{ backgroundColor: "#fff" }}
            defaultValue={"10000"}
          />
          <TextField
            id="memo"
            label="メモ"
            multiline
            rows={6}
            name="memo"
            defaultValue={"テストテストテスト"}
            sx={{ backgroundColor: "#fff" }}
          />
          <div className="my-3 flex justify-center gap-3 md:my-4 md:justify-end">
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
              保存
            </Button>
          </div>
        </div>
      </Box>
    </div>
  );
}
