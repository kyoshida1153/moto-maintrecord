"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import InputFileImage from "../InputFileImage";
import DatePicker from "../DatePicker";
import SelectBox from "../SelectBox";

export default function RecordCreateForm() {
  return (
    <div className="">
      <div className="w-full max-w-lg">
        <Box component="form" className="mt-6 md:mt-8">
          <div className="flex flex-col gap-4 md:gap-6">
            <div className="flex gap-4">
              <DatePicker name="calender_displayed_at" label="実施日や予定日" />
              <FormControlLabel
                control={<Checkbox />}
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
            />
            <TextField
              id=""
              label="金額"
              type="number"
              name=""
              sx={{ backgroundColor: "#fff" }}
            />
            <SelectBox
              name="bike_id"
              label="所有バイク"
              defaultValue="1"
              itemList={[
                { value: "1", text: "YAMAHA MT-09" },
                { value: "2", text: "KAWASAKI NINJA ZX-6R" },
                { value: "3", text: "HONDA CBR650R" },
              ]}
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
            />
            <TextField
              id="memo"
              label="メモ"
              multiline
              rows={6}
              name="memo"
              defaultValue=""
              sx={{ backgroundColor: "#fff" }}
            />
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
            />
            <div className="my-3 flex justify-center gap-3 md:my-4 md:justify-end">
              <Button
                variant="contained"
                disableElevation
                className="max-w-fit !px-[1.5em] !text-[16px]"
                type="submit"
              >
                登録
              </Button>
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
}
