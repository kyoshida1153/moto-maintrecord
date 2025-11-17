import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import MuiLink from "@mui/material/Link";
import { Heading } from "@/components";
import BikeCardList from "./_components/BikeCardList";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "所有バイク",
  };
}

export default function BikePage() {
  return (
    <>
      <Heading level={1}>所有バイク</Heading>
      <div className="max-w-3xl">
        <div className="my-6 text-center md:my-8 md:text-left">
          <Button
            component={MuiLink}
            variant="contained"
            disableElevation
            startIcon={<AddIcon />}
            href="/bike/create"
            sx={{
              maxWidth: "fit-content",
              whiteSpace: "nowrap",
            }}
          >
            所有バイクの登録
          </Button>
        </div>
        <BikeCardList />
      </div>
    </>
  );
}
