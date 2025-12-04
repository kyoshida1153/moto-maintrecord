"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { ja } from "date-fns/locale";

import { getMaintenanceRecord } from "@/lib/api";

import CheckIcon from "@mui/icons-material/Check";
// import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EditSquareIcon from "@mui/icons-material/EditSquare";
import DeleteIcon from "@mui/icons-material/Delete";

import { Loading } from "@/components";
import MaintenanceRecordDetailHeading from "./MaintenanceRecordDetailHeading";
import MaintenanceRecordDetailSection from "./MaintenanceRecordDetailSection";
import type { MaintenanceRecordUniqueSelect } from "@/app/api/maintenance-records/[id]/route";

type GetMaintenanceRecordResponse = {
  status: "success" | "error" | undefined;
  message: string;
  result?: MaintenanceRecordUniqueSelect;
};

export default function MaintenanceRecordDetail({
  maintenanceRecordId,
}: {
  maintenanceRecordId: string;
}) {
  const [getMaintenanceRecordResponse, setGetMaintenanceRecordResponse] =
    useState<GetMaintenanceRecordResponse>({
      status: undefined,
      message: "",
    });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadedStatus, setLoadedStatus] = useState<
    "success" | "error" | undefined
  >(undefined);

  // 必要なデータの読み込み～セット
  useEffect(() => {
    (async () => {
      const response = await getMaintenanceRecord(maintenanceRecordId);
      setGetMaintenanceRecordResponse({
        status: response.success === true ? "success" : "error",
        message: response.message,
        result: response.result,
      });

      if (response.success === true) {
        setLoadedStatus("success");
      } else {
        setLoadedStatus("error");
      }

      setIsLoading(false);
    })();
  }, [maintenanceRecordId]);

  return (
    <>
      {isLoading ? (
        <div className="flex w-full justify-center py-4">
          <Loading size="36px" />
        </div>
      ) : loadedStatus === "success" ? (
        <div className="display rounded border border-solid border-[var(--border-color-gray)] bg-white p-6 md:p-8">
          <div className="flex flex-col gap-8 md:gap-10">
            <MaintenanceRecordDetailSection>
              <MaintenanceRecordDetailHeading>
                日付
              </MaintenanceRecordDetailHeading>
              <p>
                {getMaintenanceRecordResponse.result?.calenderDate
                  ? format(
                      getMaintenanceRecordResponse.result.calenderDate,
                      "yyyy年M月d日",
                      { locale: ja },
                    )
                  : "-"}

                {getMaintenanceRecordResponse.result?.isDone && (
                  <span className="ml-2 inline-block -translate-y-0.5 rounded-full bg-[var(--icon-color-success)] px-2 py-0.5 text-xs text-white">
                    <CheckIcon sx={{ color: "white", fontSize: "13px" }} />
                    実施済
                  </span>
                )}
              </p>
            </MaintenanceRecordDetailSection>

            <MaintenanceRecordDetailSection>
              <MaintenanceRecordDetailHeading>
                タイトル
              </MaintenanceRecordDetailHeading>
              <p>
                {getMaintenanceRecordResponse.result?.title &&
                getMaintenanceRecordResponse.result.title.length > 0 ? (
                  getMaintenanceRecordResponse.result.title
                ) : (
                  <span className="text-gray-400">登録なし</span>
                )}
              </p>
            </MaintenanceRecordDetailSection>

            <MaintenanceRecordDetailSection>
              <MaintenanceRecordDetailHeading>
                金額
              </MaintenanceRecordDetailHeading>
              <p>
                {typeof getMaintenanceRecordResponse.result?.cost ===
                "number" ? (
                  <>
                    <span className="font-alphanumeric">
                      {getMaintenanceRecordResponse.result.cost.toLocaleString()}
                    </span>
                    <span className="ml-[1px] text-sm">円</span>
                  </>
                ) : (
                  <span className="text-gray-400">登録なし</span>
                )}
              </p>
            </MaintenanceRecordDetailSection>

            <MaintenanceRecordDetailSection>
              <MaintenanceRecordDetailHeading>
                所有バイク
              </MaintenanceRecordDetailHeading>
              {getMaintenanceRecordResponse.result?.bike?.name ? (
                <p className="flex items-center gap-2">
                  <Link
                    href={`/bike/${getMaintenanceRecordResponse.result.bike.id}`}
                    className="flex items-center gap-2 text-[var(--link-color)] transition-opacity duration-200 hover:opacity-70"
                  >
                    <span className="w-[36px] min-w-[36px]">
                      <Image
                        src={
                          getMaintenanceRecordResponse.result.bike.imageUrl
                            ? getMaintenanceRecordResponse.result.bike.imageUrl
                            : "/assets/img/bike-default.svg"
                        }
                        alt=""
                        width={36}
                        height={36}
                        className="aspect-square w-full rounded-full border border-gray-300 bg-white object-cover"
                      />
                    </span>
                    <span className="line-clamp-3 leading-snug md:line-clamp-2">
                      {getMaintenanceRecordResponse.result.bike.name}
                    </span>
                  </Link>
                </p>
              ) : (
                <p>
                  <span className="text-gray-400">登録なし</span>
                </p>
              )}
            </MaintenanceRecordDetailSection>

            <MaintenanceRecordDetailSection>
              <MaintenanceRecordDetailHeading>
                カテゴリー
              </MaintenanceRecordDetailHeading>
              <p>
                {getMaintenanceRecordResponse.result?.maintenanceCategory
                  ?.name ?? <span className="text-gray-400">登録なし</span>}
              </p>
            </MaintenanceRecordDetailSection>

            <MaintenanceRecordDetailSection>
              <MaintenanceRecordDetailHeading>
                メモ
              </MaintenanceRecordDetailHeading>
              <p className="whitespace-pre-line">
                {typeof getMaintenanceRecordResponse.result?.memo ===
                "string" ? (
                  getMaintenanceRecordResponse.result.memo
                ) : (
                  <span className="text-gray-400">登録なし</span>
                )}
              </p>
            </MaintenanceRecordDetailSection>

            <MaintenanceRecordDetailSection>
              <MaintenanceRecordDetailHeading>
                画像
              </MaintenanceRecordDetailHeading>
              {getMaintenanceRecordResponse.result?.maintenanceRecordImages &&
              getMaintenanceRecordResponse.result.maintenanceRecordImages
                .length > 0 ? (
                <p className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-4 py-2">
                  {getMaintenanceRecordResponse.result.maintenanceRecordImages.map(
                    (item) => {
                      return (
                        <Link
                          target="_blank"
                          href={item.imageUrl}
                          key={item.id}
                          className="aspect-square overflow-hidden rounded bg-white duration-250 hover:bg-[#808080]"
                        >
                          <Image
                            src={item.imageUrl}
                            alt=""
                            width={320}
                            height={320}
                            className="aspect-square w-full bg-white object-cover transition-all duration-250 hover:scale-105 hover:scale-[1.05] hover:opacity-80"
                          />
                        </Link>
                      );
                    },
                  )}
                </p>
              ) : (
                <p>
                  <span className="text-gray-400">登録なし</span>
                </p>
              )}
            </MaintenanceRecordDetailSection>

            <MaintenanceRecordDetailSection>
              <MaintenanceRecordDetailHeading>
                走行距離
              </MaintenanceRecordDetailHeading>
              <p>
                {typeof getMaintenanceRecordResponse.result?.mileage ===
                "number" ? (
                  <>
                    <span className="font-alphanumeric">
                      {getMaintenanceRecordResponse.result.mileage.toLocaleString()}
                    </span>
                    <span className="ml-[1px] text-sm">km</span>
                  </>
                ) : (
                  <span className="text-gray-400">登録なし</span>
                )}
              </p>
            </MaintenanceRecordDetailSection>

            <ul className="flex justify-center gap-2 border-t-1 border-gray-200 pt-2">
              <li>
                <Link
                  href={`/record/${maintenanceRecordId}/edit`}
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
                  href={`/record/${maintenanceRecordId}/delete`}
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
        <p>
          {getMaintenanceRecordResponse.message
            ? getMaintenanceRecordResponse.message
            : "読み込みに失敗しました。"}
        </p>
      )}
    </>
  );
}
