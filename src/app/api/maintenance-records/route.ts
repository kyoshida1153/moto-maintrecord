import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import getCurrentUser from "@/actions/getCurrentUser";
import isNumber from "@/utils/isNumber";

const maintenanceRecordSelect =
  Prisma.validator<Prisma.MaintenanceRecordSelect>()({
    id: true,
    title: true,
    cost: true,
    calenderDate: true,
    bike: {
      select: { name: true },
    },
    maintenanceCategory: {
      select: { name: true },
    },
  });

export type MaintenanceRecordSelect = Prisma.MaintenanceRecordGetPayload<{
  select: typeof maintenanceRecordSelect;
}>;

/**
 * 一覧取得
 */
export async function GET(
  request: NextRequest,
): Promise<
  NextResponse<{ message: string; result?: MaintenanceRecordSelect[] }>
> {
  // 認証チェック
  const currentUser = await getCurrentUser();
  const userId: string = currentUser?.id ?? "";
  if (!currentUser && !userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  // const userId = "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11";

  // ここからDB操作
  try {
    const params = request.nextUrl.searchParams;
    const pageString = params.get("page") || "";
    const page = isNumber(pageString) ? Number(pageString) : 1;

    const take = Number(
      process.env.NEXT_PUBLIC_MAINTENANCE_RECORD_LIST_LIMIT || 31,
    );
    const skip = take * (page - 1);

    const result = await prisma.maintenanceRecord.findMany({
      select: maintenanceRecordSelect,
      where: { userId },
      skip,
      take,
      orderBy: { calenderDate: "desc" },
    });

    if (result) {
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
