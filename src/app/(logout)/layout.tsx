import { redirect } from "next/navigation";
import getCurrentUser from "@/actions/getCurrentUser";
import Header from "@/components/Header";

export default async function LogoutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  if (currentUser) {
    redirect("/top");
  }

  return (
    <>
      <Header sessionExist={false} userName={""} />
      <main className="p-4 md:p-8">{children}</main>
    </>
  );
}
