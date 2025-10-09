import Link from "next/link";
import EditSquareIcon from "@mui/icons-material/EditSquare";
import DeleteIcon from "@mui/icons-material/Delete";
import Image from "next/image";

export default function BikeCard({
  id,
  name,
  mileage_km,
  image_url,
}: {
  id: string;
  name: string;
  mileage_km: string;
  image_url: string;
}) {
  return (
    <div className="flex flex-row flex-wrap items-center gap-2 rounded border border-solid border-[var(--border-color-gray)] bg-white px-3 py-2 text-[#333] md:flex-nowrap md:gap-4 md:px-4 md:py-3">
      <div className="flex w-full flex-row gap-2 md:gap-4">
        <Link href={`/bike/${id}`} className="duration-200 hover:opacity-70">
          <Image
            src={image_url}
            alt=""
            width={320}
            height={320}
            className="aspect-square w-full max-w-[40px] min-w-[50px] rounded-full"
          />
        </Link>
        <div className="flex flex-col gap-1">
          <h3 className="line-clamp-1 text-lg duration-200 hover:opacity-70 md:text-xl">
            <Link href={`/bike/${id}`}>{name}</Link>
          </h3>
          <p className="text-sm">毎月の走行距離： {mileage_km}km</p>
        </div>
      </div>
      <ul className="ml-auto flex w-full flex-row flex-nowrap items-center justify-end gap-2 text-sm md:w-auto md:text-[15px]">
        <li>
          <Link
            href={`/bike/${id}/edit`}
            className="flex flex-row flex-nowrap items-center gap-[1px] whitespace-nowrap duration-200 hover:opacity-70"
          >
            <EditSquareIcon className="!text-[20px]" />
            編集
          </Link>
        </li>
        <li>
          <Link
            href={`/bike/${id}/delete`}
            className="flex flex-row flex-nowrap items-center gap-[1px] whitespace-nowrap duration-200 hover:opacity-70"
          >
            <DeleteIcon className="!text-[20px]" />
            削除
          </Link>
        </li>
      </ul>
    </div>
  );
}
