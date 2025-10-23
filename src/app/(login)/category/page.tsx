import Heading from "@/components/Heading";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import MuiLink from "@mui/material/Link";
import MaintenanceCategoryCardList from "./_components/MaintenanceCategoryCardList";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "カテゴリー",
  };
}

export default function MaintenanceCategoryPage() {
  return (
    <div className="w-full max-w-3xl">
      <Heading level={1}>カテゴリー</Heading>
      <div className="my-6 text-center md:my-8 md:text-left">
        <Button
          component={MuiLink}
          variant="contained"
          disableElevation
          startIcon={<AddIcon />}
          href="/category/create"
          sx={{
            maxWidth: "fit-content",
            whiteSpace: "nowrap",
          }}
        >
          カテゴリーの登録
        </Button>
      </div>
      <MaintenanceCategoryCardList />
    </div>
  );
}
