import { redirect } from "next/navigation";
import LoginSuccess from "./_components/LoginSuccess";
import getCurrentUser from "@/actions/getCurrentUser";

export default async function LoginSuccessPage() {
  // ログアウト状態の時は、ログインページにリダイレクト
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    redirect("/login");
  }

  return <LoginSuccess />;
}
