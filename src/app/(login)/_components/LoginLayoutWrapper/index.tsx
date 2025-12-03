"use client";

import { useEffect } from "react";
import type { Session } from "next-auth";
import useHeaderStore from "@/app/_components/Header/store";

export default function LoginLayoutWrapper({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session;
}) {
  const { setGetLoginUserResponse, setIsLoadingGetLoginUser } =
    useHeaderStore();

  useEffect(() => {
    setIsLoadingGetLoginUser(true);

    if (!session?.user?.email) {
      setGetLoginUserResponse({
        status: "error",
        message: "取得に失敗しました。",
        result: undefined,
      });
      setIsLoadingGetLoginUser(false);
      return;
    }

    setGetLoginUserResponse({
      status: "success",
      message: "取得に成功しました。",
      result: {
        name: session.user.name,
        image: session.user.image,
      },
    });
    setIsLoadingGetLoginUser(false);
  }, [setGetLoginUserResponse, setIsLoadingGetLoginUser, session]);

  return <>{children}</>;
}
