"use client";

import { Loading } from "@/components";
import { useUserNameEditFormStore } from "./stores";
import UserNameEditFormForm from "./UserNameEditFormForm";

export default function UserNameEditForm() {
  const { isLoadingNameEditForm } = useUserNameEditFormStore();

  return (
    <>
      {isLoadingNameEditForm ? (
        <div className="flex w-full max-w-lg justify-center py-2">
          <Loading size="24px" />
        </div>
      ) : (
        <UserNameEditFormForm />
      )}
    </>
  );
}
