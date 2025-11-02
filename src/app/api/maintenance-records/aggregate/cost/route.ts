import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import getCurrentUser from "@/actions/getCurrentUser";
import { endOfMonth, startOfMonth, parseISO } from "date-fns";
import isDateYyyyMm from "@/utils/isDateYyyyMm";
import isDateYyyy from "@/utils/isDateYyyy";

/* ###################################################################### */

// costの合計を取得

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

    // 年、月での取得範囲
    const dateString = params.get("date") || "";
    const targetDate = isDateYyyyMm(dateString)
      ? parseISO(dateString)
      : isDateYyyy(dateString)
        ? parseISO(dateString)
        : null;

    const startDate = targetDate ? startOfMonth(targetDate) : undefined;
    const endDate = targetDate ? endOfMonth(targetDate) : undefined;

    const result = await prisma.maintenanceRecord.aggregate({
      _sum: {
        cost: true,
      },
      where: {
        userId,
        calenderDate: {
          gte: startDate,
          lt: endDate,
        },
        deletedAt: null,
      },
    });

    if (result._sum.cost !== null && result._sum.cost >= 0) {
      return NextResponse.json(
        { message: "Success", result: result._sum.cost },
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
