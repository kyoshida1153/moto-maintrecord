import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Header from "../_components/Header";

export default async function LogoutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
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
