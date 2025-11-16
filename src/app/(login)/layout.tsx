import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import Header from "@/app/_components/Header";
import Sidebar from "@/app/_components/Sidebar";
import LoginLayoutWrapper from "./_components/LoginLayoutWrapper";

export default async function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <LoginLayoutWrapper session={session}>
      <Header isLogin={true} />
      <div className="block md:grid md:grid-cols-[var(--sidebar-width)_1fr]">
        <div className="hidden md:col-span-1 md:block">
          <Sidebar isLogin={true} />
        </div>
        <main className="p-4 md:col-span-1 md:p-8">{children}</main>
      </div>
    </LoginLayoutWrapper>
  );
}
