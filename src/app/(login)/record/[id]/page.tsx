import Heading from "@/components/Heading";
import RecordDetail from "@/components/RecordDetail";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export default function RecordDetailPage() {
  return (
    <div className="w-full max-w-2xl">
      <p className="flex items-center gap-0.5 text-lg font-[500] md:text-xl">
        2025年1月1日
      </p>
      <Heading level={1}>オイル交換</Heading>
      <RecordDetail />
    </div>
  );
}
