import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Not Found",
};

export default function NotFound() {
  return (
    <div className="flex h-[100vh] items-center justify-center">
      <div className="flex flex-col gap-8">
        <h2 className="flex flex-col items-center">
          <span className="font-alphanumeric text-[100px] leading-none font-bold text-[#b3b3b3]">
            404
          </span>
          <span className="text-[34px] leading-none text-[#b3b3b3]">
            Not Found
          </span>
        </h2>
        <div className="flex justify-center leading-none">
          <Link
            href="/"
            className="text-center text-lg leading-relaxed text-blue-600 underline"
          >
            {process.env.NEXT_PUBLIC_APP_NAME}
            <br />
            トップページへ
          </Link>
        </div>
      </div>
    </div>
  );
}
