"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Pagination from "@mui/material/Pagination";
import { PaginationItem } from "@mui/material";
import isNumber from "@/utils/isNumber";
import Loading from "../Loading";
import useMaintenanceRecordsStore from "@/stores/useMaintenanceRecordsStore";

export default function MaintenanceRecordsListPagination() {
  const { maintenanceRecordsCount, maintenanceRecordsCountLoading } =
    useMaintenanceRecordsStore();
  const [pageCount, setPageCount] = useState<number | undefined>(undefined);

  const searchParams = useSearchParams();
  const pageString = searchParams.get("page") || "1";
  const page = isNumber(pageString) ? Number(pageString) : 1;

  useEffect(() => {
    if (maintenanceRecordsCount === undefined) {
      setPageCount(0);
      return;
    }
    const limit = Number(process.env.NEXT_PUBLIC_MAINTENANCE_RECORD_LIST_LIMIT);
    const count = Math.ceil(maintenanceRecordsCount / limit);
    setPageCount(count);
  }, [maintenanceRecordsCount]);

  return (
    <div className="flex w-full justify-center">
      {maintenanceRecordsCountLoading ? (
        <div className="flex w-full justify-center py-1">
          <Loading size="24px" />
        </div>
      ) : (
        <>
          {pageCount && pageCount > 0 ? (
            <Pagination
              page={page}
              count={pageCount}
              renderItem={(item) => (
                <PaginationItem
                  component={Link}
                  href={`${item.page === 1 ? "?page=1" : `?page=${item.page}`}`}
                  {...item}
                />
              )}
            />
          ) : (
            ""
          )}
        </>
      )}
    </div>
  );
}
