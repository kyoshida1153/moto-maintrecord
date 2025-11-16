import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import MuiLink from "@mui/material/Link";
import { Heading, MaintenanceRecordsList } from "@/components";
import MaintenanceRecordsPageWrapper from "./_components/MaintenanceRecordsPageWrapper";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "整備・出費記録",
  };
}

export default function MaintenanceRecordsPage() {
  return (
    <MaintenanceRecordsPageWrapper>
      <div className="w-full max-w-3xl">
        <Heading level={1}>整備・出費記録</Heading>
        <div className="my-6 text-center md:my-8 md:text-left">
          <Button
            component={MuiLink}
            variant="contained"
            disableElevation
            startIcon={<AddIcon />}
            href="/record/create"
            sx={{
              maxWidth: "fit-content",
              whiteSpace: "nowrap",
            }}
          >
            整備・出費記録の登録
          </Button>
        </div>
        <MaintenanceRecordsList />
      </div>
    </MaintenanceRecordsPageWrapper>
  );
}
