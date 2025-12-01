"use client";

import { useEffect, useState } from "react";
import { Loading } from "@/components";
import { getUser } from "@/lib/api";
import { useUserNameEditFormStore } from "./stores";
import UserNameEditFormForm from "./UserNameEditFormForm";

export default function UserNameEditForm() {
  const { setGetUserResponse } = useUserNameEditFormStore();

  // 各データの読み込み～stateにセット
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadedStatus, setLoadedStatus] = useState<
    "success" | "error" | undefined
  >(undefined);

  // フォームのdefaultValueに設定するデータの読み込み
  useEffect(() => {
    Promise.all([getUser()]).then((values) => {
      setGetUserResponse({
        status: values[0].success === true ? "success" : "error",
        message: values[0].message,
        result: values[0].result,
      });
      setLoadedStatus("success");
      setIsLoading(false);
    });
  }, [setGetUserResponse]);

  return (
    <>
      {isLoading ? (
        <div className="flex w-full max-w-lg justify-center py-2">
          <Loading size="24px" />
        </div>
      ) : loadedStatus === "success" ? (
        <UserNameEditFormForm />
      ) : (
        <p>読み込みに失敗しました。</p>
      )}
    </>
  );
}
