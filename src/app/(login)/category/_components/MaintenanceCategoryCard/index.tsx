import Link from "next/link";
import EditSquareIcon from "@mui/icons-material/EditSquare";
import DeleteIcon from "@mui/icons-material/Delete";

export default function MaintenanceCategoryCard({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  return (
    <div className="flex flex-row flex-wrap items-center gap-2 rounded border border-solid border-[var(--border-color-gray)] bg-white px-3 py-2 text-[#333] md:flex-nowrap md:gap-4 md:px-4 md:py-3">
      <div className="flex w-full flex-row gap-2 md:gap-4">
        <h2 className="line-clamp-1 text-lg md:text-xl">{name}</h2>
      </div>
      <ul className="ml-auto flex w-full flex-row flex-nowrap items-center justify-end gap-3 text-sm md:w-auto md:text-[15px]">
        <li>
          <Link
            href={`/category/${id}/edit`}
            className="flex flex-row flex-nowrap items-center gap-[1px] whitespace-nowrap transition-opacity duration-200 hover:opacity-70"
          >
            <EditSquareIcon sx={{ fontSize: "20px" }} />
            編集
          </Link>
        </li>
        <li>
          <Link
            href={`/category/${id}/delete`}
            className="flex flex-row flex-nowrap items-center gap-[1px] whitespace-nowrap transition-opacity duration-200 hover:opacity-70"
          >
            <DeleteIcon sx={{ fontSize: "20px" }} />
            削除
          </Link>
        </li>
      </ul>
    </div>
  );
}
