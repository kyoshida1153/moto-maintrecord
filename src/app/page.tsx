import { redirect } from "next/navigation";
import getCurrentUser from "@/actions/getCurrentUser";

export default async function RootPage() {
  const currentUser = await getCurrentUser();
  if (currentUser) {
    redirect("/top");
  } else {
    redirect("/login");
  }

  return <></>;
}
