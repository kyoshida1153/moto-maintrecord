import { NextResponse } from "next/server";
import { prisma } from "@/lib";
import { getCurrentUser } from "@/actions";

/* ###################################################################### */

// calender_dateを年で集計

export type MaintenanceRecordAggregateCalenderDateByYears = {
  year: string;
};

export async function GET(): Promise<
  NextResponse<{
    message: string;
    result?: MaintenanceRecordAggregateCalenderDateByYears[];
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
    const result = await prisma.$queryRaw<
      MaintenanceRecordAggregateCalenderDateByYears[]
    >`
      SELECT
        to_char(
          MR.calender_date AT TIME ZONE 'Asia/Tokyo',
          'YYYY'
        ) AS year
      FROM
        maintenance_records as MR
      WHERE
        MR.user_id = ${userId}::UUID
        and MR.deleted_at isnull
      GROUP BY
        year
      ORDER BY
        year desc
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
