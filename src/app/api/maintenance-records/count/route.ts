import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib";
import { getCurrentUser } from "@/actions";
import { endOfMonth, startOfMonth, parseISO } from "date-fns";
import { isDateYyyyMm, isDateYyyy } from "@/utils";

/* ###################################################################### */

// レコードの件数を取得

export async function GET(
  request: NextRequest,
): Promise<NextResponse<{ message: string; result?: number }>> {
  // 認証チェック
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const userId = currentUser.id;

  // ここからDB操作
  try {
    const params = request.nextUrl.searchParams;

    // カレンダーで必要な設定
    // 年、月での取得範囲
    const dateString = params.get("date") || "";
    const targetDate = isDateYyyyMm(dateString)
      ? parseISO(dateString)
      : isDateYyyy(dateString)
        ? parseISO(dateString)
        : null;
    const startDate = targetDate ? startOfMonth(targetDate) : undefined;
    const endDate = targetDate ? endOfMonth(targetDate) : undefined;

    const result = await prisma.maintenanceRecord.count({
      where: {
        userId,
        calenderDate: {
          gte: startDate,
          lt: endDate,
        },
        deletedAt: null,
      },
    });

    if (result >= 0) {
      return NextResponse.json({ message: "Success", result }, { status: 201 });
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
