import AddIcon from "@mui/icons-material/Add";
import {
  Breadcrumbs,
  Heading,
  LinkButton,
  MaintenanceRecordsList,
} from "@/components";
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
      <div className="mb-4">
        <Breadcrumbs />
      </div>
      <Heading level={1}>整備・出費記録</Heading>
      <div className="max-w-3xl">
        <div className="my-6 text-center md:my-8 md:text-left">
          <LinkButton
            href="/record/create"
            startIcon={<AddIcon />}
            variant="contained"
          >
            整備・出費記録の登録
          </LinkButton>
        </div>
        <MaintenanceRecordsList />
      </div>
    </MaintenanceRecordsPageWrapper>
  );
}
