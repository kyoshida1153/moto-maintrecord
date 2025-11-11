import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import getCurrentUser from "@/actions/getCurrentUser";
import {
  format,
  parseISO,
  startOfYear,
  endOfYear,
  startOfMonth,
  endOfMonth,
} from "date-fns";
import isDateYyyy from "@/utils/isDateYyyy";
import isDateYyyyMm from "@/utils/isDateYyyyMm";

/* ###################################################################### */

// bike_idで集計したcostの合計値を取得

export type MaintenanceRecordAggregateCostByBike = {
  id: string;
  name: string;
  cost_str: string; // BigInt型だとJSONシリアライズ時にエラーが起きるためString型に
};

export async function GET(request: NextRequest): Promise<
  NextResponse<{
    message: string;
    result?: MaintenanceRecordAggregateCostByBike[];
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
      MaintenanceRecordAggregateCostByBike[]
    >`
    SELECT
      MAKE_T.id AS id,
      MAKE_T.name AS name,
      MAKE_T.cost::VARCHAR AS cost_str
    FROM
      (
        SELECT
          MR.bike_id AS id,
          B.name AS name,
          COALESCE(SUM(MR.cost), 0) AS cost
        FROM
          maintenance_records AS MR
          LEFT JOIN bikes AS B
          ON MR.bike_id = B.id
        WHERE
          MR.user_id = ${userId}::UUID
          AND MR.calender_date AT TIME ZONE 'Asia/Tokyo' BETWEEN ${dateRange.start}::DATE AND ${dateRange.end}::DATE
          AND MR.deleted_at isnull
        GROUP BY
          MR.bike_id, B.name
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
