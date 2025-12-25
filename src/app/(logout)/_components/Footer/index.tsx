import MailOutlineIcon from "@mui/icons-material/MailOutline";

if (!process.env.NEXT_PUBLIC_AUTHER_NAME) {
  throw new Error("NEXT_PUBLIC_AUTHER_NAMEが設定されていません。");
}
const autherName = process.env.NEXT_PUBLIC_AUTHER_NAME;

if (!process.env.NEXT_PUBLIC_AUTHER_EMAIL) {
  throw new Error("NEXT_PUBLIC_AUTHER_EMAILが設定されていません。");
}
const autherEmail = process.env.NEXT_PUBLIC_AUTHER_EMAIL;

export default async function Footer() {
  return (
    <footer className="flex h-full max-h-[var(--footer-height)] min-h-[var(--footer-height)] flex-col items-center justify-center gap-2 bg-[#1c3b4a] px-4 text-center text-sm text-white">
      <address className="flex flex-row items-center gap-1 py-2 text-sm leading-none text-gray-200 not-italic">
        <span className="flex flex-row flex-nowrap items-center gap-0.5 text-sm">
          <MailOutlineIcon sx={{ fontSize: "16px", mt: "2px" }} />
          お問い合わせ:
        </span>
        <span className="text-[13px]">{autherEmail}</span>
      </address>
      <div className="text-[13px] text-gray-400">&copy; {autherName}</div>
    </footer>
  );
}
