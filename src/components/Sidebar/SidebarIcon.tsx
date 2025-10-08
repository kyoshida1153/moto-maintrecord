import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import CategoryIcon from "@mui/icons-material/Category";
import BarChartIcon from "@mui/icons-material/BarChart";

export default function SidebarIcon({
  iconName,
  className,
}: {
  iconName: string;
  className?: string;
}) {
  switch (iconName) {
    case "CalendarMonthIcon":
      return <CalendarMonthIcon className={className || ""} />;
    case "NoteAltIcon":
      return <NoteAltIcon className={className || ""} />;
    case "TwoWheelerIcon":
      return <TwoWheelerIcon className={className || ""} />;
    case "CategoryIcon":
      return <CategoryIcon className={className || ""} />;
    case "BarChartIcon":
      return <BarChartIcon className={className || ""} />;
    default:
      return <></>;
  }
}
