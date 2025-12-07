"use client";

import Link from "next/link";
import Image from "next/image";

import EditSquareIcon from "@mui/icons-material/EditSquare";
import DeleteIcon from "@mui/icons-material/Delete";

import { Loading } from "@/components";
import BikeDetailSection from "./BikeDetailSection";
import BikeDetailHeading from "./BikeDetailHeading";

import { useBikeDetailStore } from "./stores";

export default function BikeDetail() {
  const { getBikeResponse, isLoadingBikeDetail } = useBikeDetailStore();

  return (
    <>
      {isLoadingBikeDetail ? (
        <div className="flex w-full justify-center py-4">
          <Loading size="36px" />
        </div>
      ) : getBikeResponse.status === "success" ? (
        getBikeResponse.result ? (
          <div className="display rounded border border-solid border-[var(--border-color-gray)] bg-white p-6 md:p-8">
            <div className="flex flex-col gap-8 md:gap-10">
              <BikeDetailSection>
                <BikeDetailHeading>バイクの名前</BikeDetailHeading>
                <p>
                  {typeof getBikeResponse.result?.name === "string" ? (
                    getBikeResponse.result.name
                  ) : (
                    <span className="text-gray-400">登録なし</span>
                  )}
                </p>
              </BikeDetailSection>

              <BikeDetailSection>
                <BikeDetailHeading>画像</BikeDetailHeading>
                {typeof getBikeResponse.result?.imageUrl === "string" ? (
                  <p className="">
                    <Link
                      target="_blank"
                      href={getBikeResponse.result.imageUrl}
                      className="block aspect-square overflow-hidden rounded bg-white duration-250 hover:bg-[#808080] sm:w-full md:w-[320px]"
                    >
                      <Image
                        src={getBikeResponse.result.imageUrl}
                        alt=""
                        width={320}
                        height={320}
                        className="aspect-square w-full bg-white object-cover transition-all duration-250 hover:scale-105 hover:scale-[1.05] hover:opacity-80"
                      />
                    </Link>
                  </p>
                ) : (
                  <p>
                    <span className="text-gray-400">登録なし</span>
                  </p>
                )}
              </BikeDetailSection>

              <BikeDetailSection>
                <BikeDetailHeading>毎月の走行距離</BikeDetailHeading>
                <p>
                  {typeof getBikeResponse.result?.mileage === "number" ? (
                    <>
                      <span className="font-alphanumeric">
                        {getBikeResponse.result.mileage.toLocaleString()}
                      </span>
                      <span className="ml-[1px] text-sm">km</span>
                    </>
                  ) : (
                    <span className="text-gray-400">登録なし</span>
                  )}
                </p>
              </BikeDetailSection>

              <BikeDetailSection>
                <BikeDetailHeading>メモ</BikeDetailHeading>
                <p>
                  {typeof getBikeResponse.result?.memo === "string" ? (
                    getBikeResponse.result.memo
                  ) : (
                    <span className="text-gray-400">登録なし</span>
                  )}
                </p>
              </BikeDetailSection>

              <ul className="flex justify-center gap-2 border-t-1 border-gray-200 pt-2">
                <li>
                  <Link
                    href={`/bike/${getBikeResponse.result.id}/edit`}
                    className="flex items-center gap-1 rounded-[4px] px-4 py-2 text-base transition-colors duration-200 hover:bg-[#f6f7f9]"
                  >
                    <EditSquareIcon sx={{ fontSize: "18px" }} />
                    <span>編集</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/bike/${getBikeResponse.result.id}/delete`}
                    className="flex items-center gap-1 rounded-[4px] px-4 py-2 text-base transition-colors duration-200 hover:bg-[#f6f7f9]"
                  >
                    <DeleteIcon sx={{ fontSize: "18px" }} />
                    <span>削除</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <p>表示できるデータがありませんでした。</p>
        )
      ) : (
        <p>
          {getBikeResponse.message
            ? getBikeResponse.message
            : "読み込みに失敗しました。"}
        </p>
      )}
    </>
  );
}
