import { redirect } from "next/navigation";
import getCurrentUser from "@/actions/getCurrentUser";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default async function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    redirect("/login");
  }
  const userName = currentUser.name ?? "";

  return (
    <>
      <Header sessionExist={true} userName={userName} />
      <div className="block md:grid md:grid-cols-[var(--sidebar-width)_1fr]">
        <div className="hidden md:col-span-1 md:block">
          <Sidebar sessionExist={true} />
        </div>
        <main className="p-4 md:col-span-1 md:p-8">{children}</main>
      </div>
    </>
  );
}
