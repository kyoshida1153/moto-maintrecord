import AddIcon from "@mui/icons-material/Add";
import { Heading, LinkButton } from "@/components";
import MaintenanceCategoryCardList from "./_components/MaintenanceCategoryCardList";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "カテゴリー",
  };
}

export default function MaintenanceCategoryPage() {
  return (
    <>
      <Heading level={1}>カテゴリー</Heading>
      <div className="max-w-3xl">
        <div className="my-6 text-center md:my-8 md:text-left">
          <LinkButton
            href="/category/create"
            startIcon={<AddIcon />}
            variant="contained"
          >
            カテゴリーの登録
          </LinkButton>
        </div>
        <MaintenanceCategoryCardList />
      </div>
    </>
  );
}
