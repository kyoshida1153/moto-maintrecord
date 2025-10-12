"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import InputFileImage from "@/components/InputFileImage";
import DatePicker from "@/components/DatePicker";
import SelectBox from "@/components/SelectBox";

export default function MaintenanceRecordEditForm() {
  return (
    <div className="w-full max-w-lg">
      <Box component="form" className="mt-6 md:mt-8">
        <div className="flex flex-col gap-4 md:gap-6">
          <div className="flex gap-4">
            <DatePicker
              name="calender_displayed_at"
              label="実施日や予定日"
              date="2025-10-01"
            />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              name="status_done_flag"
              label="実施済み"
              className="whitespace-nowrap"
            />
          </div>
          <TextField
            id=""
            label="タイトル"
            type="text"
            name=""
            sx={{ backgroundColor: "#fff" }}
            defaultValue={"オイル交換"}
          />
          <TextField
            id=""
            label="金額"
            type="number"
            name=""
            sx={{ backgroundColor: "#fff" }}
            defaultValue={"5000"}
          />
          <SelectBox
            name="bike_id"
            label="所有バイク"
            itemList={[
              { value: "1", text: "YAMAHA MT-09" },
              { value: "2", text: "KAWASAKI NINJA ZX-6R" },
              { value: "3", text: "HONDA CBR650R" },
            ]}
            defaultValue="1"
          />
          <SelectBox
            name="bike_id"
            label="カテゴリー"
            itemList={[
              { value: "", text: "未選択" },
              { value: "1", text: "メンテナンス" },
              { value: "2", text: "カスタム" },
              { value: "3", text: "ツーリング" },
            ]}
            defaultValue="1"
          />
          <TextField
            id="memo"
            label="メモ"
            multiline
            rows={6}
            name="memo"
            sx={{ backgroundColor: "#fff" }}
            defaultValue={"バイクショップ〇〇にてオイル交換。"}
          />
          {/* あとでやる: 選択された画像の表示 */}
          <InputFileImage
            name="image_url"
            multiple={true}
            label="写真を選択（3枚まで）"
          />
          <TextField
            id="mileage_km"
            label="走行距離（km）"
            type="number"
            name="mileage_km"
            sx={{ backgroundColor: "#fff" }}
            defaultValue={"10000"}
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
