import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib";
import { getCurrentUser } from "@/actions";
import { format, parseISO, startOfYear, endOfYear } from "date-fns";
import { isDateYyyy } from "@/utils";

/* ###################################################################### */

// calender_dateの月別で集計したcostの合計値を取得

export type MaintenanceRecordAggregateCostByMonth = {
  date: Date;
  cost_str: string; // BigInt型だとJSONシリアライズ時にエラーが起きるためString型に
};

export async function GET(request: NextRequest): Promise<
  NextResponse<{
    message: string;
    result?: MaintenanceRecordAggregateCostByMonth[];
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

    // 取得範囲: 年単位
    const dateString = params.get("date") || "";
    const targetDate = isDateYyyy(dateString)
      ? parseISO(dateString)
      : new Date();
    const startDate = format(startOfYear(targetDate), "yyyy-MM-dd 00:00:00");
    const endDate = format(endOfYear(targetDate), "yyyy-MM-dd 23:59:59");

    const result = await prisma.$queryRaw<
      MaintenanceRecordAggregateCostByMonth[]
    >`
      SELECT
        MONTH_T.date AS date,
        COALESCE(COST_T.cost, 0)::VARCHAR AS cost_str
      FROM
        (
          SELECT
            to_char(
              GENERATE_SERIES(${startDate}::DATE, ${endDate}::DATE, '1 month'),
              'YYYY-MM'
            ) AS date
        ) AS MONTH_T
        LEFT OUTER JOIN (
          SELECT
            to_char(MR.calender_date AT TIME ZONE 'Asia/Tokyo', 'YYYY-MM') AS date,
            SUM(MR.cost) AS cost
          FROM maintenance_records AS MR
          WHERE user_id = ${userId}::UUID
            AND calender_date AT TIME ZONE 'Asia/Tokyo' BETWEEN ${startDate}::DATE AND ${endDate}::DATE
            AND deleted_at isnull
          GROUP BY date
        ) COST_T
        ON COST_T.date = MONTH_T.date
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
