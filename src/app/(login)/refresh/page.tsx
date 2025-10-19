import { redirect } from "next/navigation";
import getCurrentUser from "@/actions/getCurrentUser";
import RefreshContent from "./_components/RefreshContent";

/**
 * ログイン時: 画面をリフレッシュ後、トップページへリダイレクト
 * ログアウト時: ログインページにリダイレクト
 */
export default async function RefreshPage() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    redirect("/login");
  }

  return <RefreshContent />;
}
