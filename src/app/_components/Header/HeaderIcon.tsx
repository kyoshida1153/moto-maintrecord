import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";
import BarChartIcon from "@mui/icons-material/BarChart";
import BuildIcon from "@mui/icons-material/Build";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CategoryIcon from "@mui/icons-material/Category";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";

export default function HeaderIcon({
  iconName,
  className,
}: {
  iconName: string;
  className?: string;
}) {
  switch (iconName) {
    case "AccountCircleIcon":
      return <AccountCircleIcon className={className || ""} />;
    case "AddIcon":
      return <AddIcon className={className || ""} />;
    case "BarChartIcon":
      return <BarChartIcon className={className || ""} />;
    case "BuildIcon":
      return <BuildIcon className={className || ""} />;
    case "CalendarMonthIcon":
      return <CalendarMonthIcon className={className || ""} />;
    case "CategoryIcon":
      return <CategoryIcon className={className || ""} />;
    case "LoginIcon":
      return <LoginIcon className={className || ""} />;
    case "LogoutIcon":
      return <LogoutIcon className={className || ""} />;
    case "NoteAltIcon":
      return <NoteAltIcon className={className || ""} />;
    case "TwoWheelerIcon":
      return <TwoWheelerIcon className={className || ""} />;
    default:
      return <></>;
  }
}
