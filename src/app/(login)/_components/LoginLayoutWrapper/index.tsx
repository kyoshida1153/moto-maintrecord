"use client";

import { useEffect } from "react";
import useSessionStore from "../useSessionStore";
import type { Session } from "next-auth";

export default function LoginLayoutWrapper({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session;
}) {
  const { setGetSessionResponse, setIsLoadingGetSession } = useSessionStore();

  useEffect(() => {
    console.log("useEffect", session);
    setIsLoadingGetSession(true);
    if (!session?.user?.email) {
      setGetSessionResponse({
        status: "error",
        message: "取得に失敗しました。",
        result: undefined,
      });

      setIsLoadingGetSession(false);
      return;
    }

    setGetSessionResponse({
      status: "success",
      message: "取得に成功しました。",
      result: session,
    });
    setIsLoadingGetSession(false);
  }, [setGetSessionResponse, setIsLoadingGetSession, session]);

  return <>{children}</>;
}
