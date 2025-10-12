import Link from "next/link";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import { Button } from "@mui/material";
import MuiLink from "@mui/material/Link";
import Heading from "@/components/Heading";
import AccountNameEditForm from "./_components/AccountNameEditForm";

export default function AccountPage() {
  return (
    <>
      <Heading level={1}>アカウント情報</Heading>
      <section className="display max-w-lg rounded border border-solid border-[var(--border-color-gray)] bg-white p-6 md:p-8">
        <div className="flex flex-col gap-6 md:gap-8">
          <AccountNameEditForm />

          <ul className="flex flex-col items-start gap-4 md:gap-2">
            <li>
              <Link
                href="/account/email"
                className="flex items-center gap-1 rounded-[4px] px-4 py-2 text-base transition-colors duration-200 hover:bg-[#f6f7f9]"
              >
                <EmailIcon sx={{ fontSize: "22px" }} />
                <span>メールアドレス変更</span>
              </Link>
            </li>
            <li>
              <Link
                href="/account/password"
                className="flex items-center gap-1 rounded-[4px] px-4 py-2 text-base transition-colors duration-200 hover:bg-[#f6f7f9]"
              >
                <KeyIcon sx={{ fontSize: "22px" }} />
                <span>パスワード変更</span>
              </Link>
            </li>
          </ul>

          <div className="flex justify-center border-t-1 border-gray-200 pt-6 md:pt-8">
            <Button
              component={MuiLink}
              variant="outlined"
              disableElevation
              href="/account/delete"
              sx={{
                maxWidth: "fit-content",
                px: "1.5em",
                fontSize: "16px",
              }}
            >
              アカウントを削除する
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
