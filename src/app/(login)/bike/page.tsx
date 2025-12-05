import AddIcon from "@mui/icons-material/Add";
import { Breadcrumbs, Heading, LinkButton } from "@/components";
import BikePageWrapper from "./_components/BikePageWrapper";
import BikeList from "./_components/BikeList";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "所有バイク",
  };
}

export default function BikePage() {
  return (
    <BikePageWrapper>
      <div className="mb-4">
        <Breadcrumbs />
      </div>
      <Heading level={1}>所有バイク</Heading>
      <div className="max-w-3xl">
        <div className="my-6 text-center md:my-8 md:text-left">
          <LinkButton
            href="/bike/create"
            startIcon={<AddIcon />}
            variant="contained"
          >
            所有バイクの登録
          </LinkButton>
        </div>
        <BikeList />
      </div>
    </BikePageWrapper>
  );
}
