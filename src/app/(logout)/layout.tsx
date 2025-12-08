import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Header from "../_components/Header";

export default async function LogoutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (session?.user) {
    redirect("/top");
  }

  return (
    <>
      <Header isLogin={false} />
      <main className="p-4 md:p-8">{children}</main>
    </>
  );
}
