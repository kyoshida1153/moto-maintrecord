import Heading from "@/components/Heading";
import AccountPasswordEditForm from "./_components/AccountPasswordEditForm";

export default function AccountPasswordEditPage() {
  return (
    <>
      <Heading level={1}>パスワードの変更</Heading>
      <AccountPasswordEditForm />
    </>
  );
}
