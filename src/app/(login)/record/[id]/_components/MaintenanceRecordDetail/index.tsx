"use client";

import Link from "next/link";
import EditSquareIcon from "@mui/icons-material/EditSquare";
// import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import Image from "next/image";

export default function MaintenanceRecordDetail() {
  return (
    <div className="display rounded border border-solid border-[var(--border-color-gray)] bg-white p-6 md:p-8">
      <div className="flex flex-col gap-8 md:gap-10">
        <section>
          <h2 className="mb-2 text-xl font-[500]">金額</h2>
          <p>
            <span className="font-alphanumeric">3,000</span>円
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-[500]">所有バイク</h2>
          <p>YAMAHA MT-09</p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-[500]">カテゴリー</h2>
          <p>メンテナンス</p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-[500]">メモ</h2>
          <p>
            テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-[500]">写真</h2>
          <p className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-4">
            <Image
              src={"/dummy-320x320.png"}
              alt=""
              width={320}
              height={320}
              className="aspect-square w-full object-cover"
            />
            <Image
              src={"/dummy-320x320.png"}
              alt=""
              width={320}
              height={320}
              className="aspect-square w-full object-cover"
            />
            <Image
              src={"/dummy-320x320.png"}
              alt=""
              width={320}
              height={320}
              className="aspect-square w-full object-cover"
            />
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-[500]">走行距離（km）</h2>
          <p>
            <span className="font-alphanumeric">8,000</span>
          </p>
        </section>

        <ul className="flex justify-center gap-2 border-t-1 border-gray-200 pt-2">
          <li>
            <Link
              href={`/record/1/edit`}
              className="flex items-center gap-1 rounded-[4px] px-4 py-2 text-base transition-colors duration-200 hover:bg-[#f6f7f9]"
            >
              <EditSquareIcon sx={{ fontSize: "18px" }} />
              <span>編集</span>
            </Link>
          </li>
          {/* <li>
            <Link
              href={`/record/1/duplicate`}
              className="flex items-center gap-1 rounded-[4px] px-4 py-2 text-base transition-colors duration-200 hover:bg-[#f6f7f9]"
            >
              <ContentCopyIcon sx={{ fontSize: "18px" }} />
              <span>コピー</span>
            </Link>
          </li> */}
          <li>
            <Link
              href={`/record/1/delete`}
              className="flex items-center gap-1 rounded-[4px] px-4 py-2 text-base transition-colors duration-200 hover:bg-[#f6f7f9]"
            >
              <DeleteIcon sx={{ fontSize: "18px" }} />
              <span>削除</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
