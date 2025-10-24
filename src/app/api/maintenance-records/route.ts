import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import getCurrentUser from "@/actions/getCurrentUser";

/**
 * 登録
 */
export async function POST(
  request: Request,
): Promise<NextResponse<{ message: string }>> {
  // 認証チェック
  const currentUser = await getCurrentUser();
  const userId: string = currentUser?.id ?? "";
  if (!currentUser && !userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // ここからDB操作
  try {
    const {
      calenderDate: calenderDateString,
      isDone,
      title,
      cost,
      bikeId,
      maintenanceCategoryId,
      memo,
      mileage,
      maintenanceRecordImages,
    } = await request.json();

    const calenderDate = new Date(calenderDateString);
    if (isNaN(calenderDate.getTime())) {
      return NextResponse.json({ message: "Bad Request" }, { status: 400 });
    }

    const data = {
      userId,
      calenderDate: new Date(calenderDate),
      isDone,
      title,
      cost,
      bikeId,
      maintenanceCategoryId,
      memo,
      mileage,
    };

    let result = null;

    if (!maintenanceRecordImages) {
      result = await prisma.maintenanceRecord.create({
        data,
      });
    } else if (maintenanceRecordImages?.length > 0) {
      result = await prisma.maintenanceRecord.create({
        data: {
          ...data,
          maintenanceRecordImages: {
            create: maintenanceRecordImages,
          },
        },
      });
    } else {
      throw false;
    }

    if (result) {
      return NextResponse.json({ message: "Success" }, { status: 201 });
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
