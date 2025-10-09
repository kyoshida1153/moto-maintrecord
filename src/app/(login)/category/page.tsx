import CategoryCard from "@/components/CategoryCard";
import Heading from "@/components/Heading";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import MuiLink from "@mui/material/Link";

export default function CategoryPage() {
  const dummyCategories = [
    { id: "1", name: "メンテナンス" },
    { id: "2", name: "カスタム" },
    { id: "3", name: "ツーリング" },
  ];

  return (
    <>
      <Heading level={1}>カテゴリー</Heading>
      <div className="my-4 text-center md:my-6 md:text-left">
        <Button
          component={MuiLink}
          variant="contained"
          disableElevation
          startIcon={<AddIcon />}
          href="/category/create"
        >
          カテゴリーの登録
        </Button>
      </div>
      <div className="my-4 flex w-full max-w-3xl flex-col gap-4 md:my-6">
        {dummyCategories.map((category) => (
          <CategoryCard
            key={category.id}
            id={category.id}
            name={category.name}
          />
        ))}
      </div>
    </>
  );
}
