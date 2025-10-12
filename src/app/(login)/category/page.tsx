import Heading from "@/components/Heading";
import MaintenanceCategoryCard from "./_components/MaintenanceCategoryCard";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import MuiLink from "@mui/material/Link";

export default function MaintenanceCategoryPage() {
  const dummyCategories = [
    { id: "1", name: "メンテナンス" },
    { id: "2", name: "カスタム" },
    { id: "3", name: "ツーリング" },
  ];

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
      <div className="my-4 flex flex-col gap-4 md:my-6">
        {dummyCategories.map((category) => (
          <MaintenanceCategoryCard
            key={category.id}
            id={category.id}
            name={category.name}
          />
        ))}
      </div>
    </div>
  );
}
