import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import CategoryIcon from "@mui/icons-material/Category";
import BarChartIcon from "@mui/icons-material/BarChart";
import BuildIcon from "@mui/icons-material/Build";

export default function SidebarIcon({
  iconName,
  className,
}: {
  iconName: string;
  className?: string;
}) {
  switch (iconName) {
    case "AccountCircleIcon":
      return <AccountCircleIcon className={className || ""} />;
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
    case "BuildIcon":
      return <BuildIcon className={className || ""} />;
    default:
      return <></>;
  }
}
