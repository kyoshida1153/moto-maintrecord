import Heading from "@/components/Heading";
import AccountDeleteForm from "./_components/AccountDeleteForm";

export default function AccountDeletePage() {
  return (
    <>
      <Heading level={1}>アカウントの削除</Heading>
      <AccountDeleteForm />
    </>
  );
}
