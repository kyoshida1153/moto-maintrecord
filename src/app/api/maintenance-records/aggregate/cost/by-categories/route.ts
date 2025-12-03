import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib";
import { getCurrentUser } from "@/lib/auth";
import {
  format,
  parseISO,
  startOfYear,
  endOfYear,
  startOfMonth,
  endOfMonth,
} from "date-fns";
import { isDateYyyy, isDateYyyyMm } from "@/utils";

/* ###################################################################### */

// maintenance_category_idで集計したcostの合計値を取得

export type MaintenanceRecordAggregateCostByCategory = {
  id: string | null;
  name: string | null;
  cost_str: string; // BigInt型だとJSONシリアライズ時にエラーが起きるためString型に
};

export async function GET(request: NextRequest): Promise<
  NextResponse<{
    message: string;
    result?: MaintenanceRecordAggregateCostByCategory[];
  }>
> {
  // 認証チェック
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const userId = currentUser.id;

  // ここからDB操作
  try {
    const params = request.nextUrl.searchParams;

    // 取得範囲: 年単位 or 月単位
    const dateString = params.get("date") || "";
    const dateRange = {
      start: "",
      end: "",
    };
    if (isDateYyyyMm(dateString)) {
      dateRange.start = format(
        startOfMonth(parseISO(dateString)),
        "yyyy-MM-dd 00:00:00",
      );
      dateRange.end = format(
        endOfMonth(parseISO(dateString)),
        "yyyy-MM-dd 23:59:59",
      );
    } else if (isDateYyyy(dateString)) {
      dateRange.start = format(
        startOfYear(parseISO(dateString)),
        "yyyy-MM-dd 00:00:00",
      );
      dateRange.end = format(
        endOfYear(parseISO(dateString)),
        "yyyy-MM-dd 23:59:59",
      );
    } else {
      dateRange.start = format(startOfYear(new Date()), "yyyy-MM-dd 00:00:00");
      dateRange.end = format(endOfYear(new Date()), "yyyy-MM-dd 23:59:59");
    }

    const result = await prisma.$queryRaw<
      MaintenanceRecordAggregateCostByCategory[]
    >`
    SELECT
      MAKE_T.id AS id,
      COALESCE(MAKE_T.name, '未分類') AS name,
      MAKE_T.cost::VARCHAR AS cost_str
    FROM
      (
        SELECT
          MR.maintenance_category_id AS id,
          C.name AS name,
          COALESCE(SUM(MR.cost), 0) AS cost
        FROM
          maintenance_records AS MR
          LEFT JOIN maintenance_categories AS C
          ON MR.maintenance_category_id = C.id
        WHERE
          MR.user_id = ${userId}::UUID
          AND MR.calender_date AT TIME ZONE 'Asia/Tokyo' BETWEEN ${dateRange.start}::DATE AND ${dateRange.end}::DATE
          AND MR.deleted_at isnull
        GROUP BY
          MR.maintenance_category_id, C.name
        ORDER BY
          cost DESC
      ) AS MAKE_T
    `;

    if (result) {
      return NextResponse.json(
        { message: "Success", result: result },
        { status: 201 },
      );
    } else {
      return NextResponse.json({ message: "Not Found" }, { status: 404 });
    }
  } catch {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
