"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PaginationItem } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import isNumber from "@/utils/isNumber";
import Loading from "../Loading";
import getMaintenanceRecordCount from "./getMaintenanceRecordCount";

export default function MaintenanceRecordListPagination() {
  const [loading, setLoading] = useState<boolean>(true);
  const [maintenanceRecordCount, setMaintenanceRecordCount] = useState<
    number | undefined
  >(undefined);

  const searchParams = useSearchParams();
  const pageString = searchParams.get("page") || "1";
  const page = isNumber(pageString) ? Number(pageString) : 1;

  useEffect(() => {
    (async () => {
      const result = await getMaintenanceRecordCount();
      setLoading(false);
      if (result) {
        const limit = Number(
          process.env.NEXT_PUBLIC_MAINTENANCE_RECORD_LIST_LIMIT,
        );
        const count = Math.ceil(result / limit);
        setMaintenanceRecordCount(count);
      }
    })();
  }, []);

  return (
    <div className="flex w-full justify-center">
      {loading ? (
        <div className="flex w-full justify-center py-1">
          <Loading size="24px" />
        </div>
      ) : (
        <>
          {maintenanceRecordCount && maintenanceRecordCount > 0 ? (
            <Pagination
              page={page}
              count={maintenanceRecordCount}
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
