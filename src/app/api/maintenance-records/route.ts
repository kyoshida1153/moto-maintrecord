import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib";
import { Prisma } from "@prisma/client";
import { getCurrentUser } from "@/lib/auth";
import { isNumber, isDateYyyyMm, isDateYyyy } from "@/utils";
import {
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  parseISO,
} from "date-fns";
import { CreateMaintenanceRecordSchema } from "@/validations/CreateMaintenanceRecordSchema";

/* ###################################################################### */

// 一覧取得

const maintenanceRecordSelect = {
  id: true,
  title: true,
  cost: true,
  calenderDate: true,
  bike: {
    select: { name: true, imageUrl: true },
  },
  maintenanceCategory: {
    select: { name: true },
  },
} satisfies Prisma.MaintenanceRecordSelect;

export type MaintenanceRecordSelect = Prisma.MaintenanceRecordGetPayload<{
  select: typeof maintenanceRecordSelect;
}>;

export async function GET(
  request: NextRequest,
): Promise<
  NextResponse<{ message: string; result?: MaintenanceRecordSelect[] }>
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

    const where = { deletedAt: null };
    Object.assign(where, { userId: userId });

    // 年、月での取得範囲
    const dateString = params.get("date") || "";
    if (isDateYyyyMm(dateString)) {
      Object.assign(where, {
        calenderDate: {
          gte: startOfMonth(parseISO(dateString)),
          lt: endOfMonth(parseISO(dateString)),
        },
      });
    } else if (isDateYyyy(dateString)) {
      Object.assign(where, {
        calenderDate: {
          gte: startOfYear(parseISO(dateString)),
          lt: endOfYear(parseISO(dateString)),
        },
      });
    }

    // レコードの取得件数、取得範囲
    const takeSkip = {};
    if (params.get("page") !== "all") {
      const pageString = params.get("page") || "";
      const page = isNumber(pageString) ? Number(pageString) : 1;
      const take = Number(
        process.env.NEXT_PUBLIC_MAINTENANCE_RECORD_LIST_LIMIT || 10,
      );
      const skip = take * (page - 1);
      Object.assign(takeSkip, { take });
      Object.assign(takeSkip, { skip });
    }

    // ソート
    const orderBy = {};
    if (params.get("order") === "calender_date") {
      Object.assign(orderBy, { calenderDate: "asc" });
    } else if (params.get("order") === "calender_date_desc") {
      Object.assign(orderBy, { calenderDate: "desc" });
    }

    const result = await prisma.maintenanceRecord.findMany({
      select: maintenanceRecordSelect,
      where,
      orderBy,
      ...takeSkip,
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

/* ###################################################################### */

// 登録

export async function POST(
  request: Request,
): Promise<NextResponse<{ message: string }>> {
  // 認証チェック
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const userId = currentUser.id;

  // ここからDB操作
  try {
    const {
      bikeId,
      maintenanceCategoryId,
      calenderDate: calenderDateString,
      isDone,
      title,
      cost,
      memo,
      mileage,
      maintenanceRecordImageUrls,
    } = await request.json();

    const calenderDate = new Date(calenderDateString);
    if (isNaN(calenderDate.getTime())) {
      return NextResponse.json({ message: "Bad Request" }, { status: 400 });
    }

    // バリデーションチェック
    const validated = CreateMaintenanceRecordSchema.safeParse({
      bikeId,
      maintenanceCategoryId,
      calenderDate,
      isDone,
      title,
      cost,
      memo,
      mileage,
      maintenanceRecordImageUrls,
    });

    if (!validated.success) {
      return NextResponse.json({ message: "Bad Request" }, { status: 400 });
    }

    const data = {
      calenderDate: validated.data.calenderDate,
      isDone: validated.data.isDone,
      title: validated.data.title,
      cost: validated.data.cost,
      memo: validated.data.memo,
      mileage: validated.data.mileage,
      user: {
        connect: {
          id: userId,
        },
      },
    };

    // 所有バイクが選択されている場合
    if (validated.data.bikeId) {
      Object.assign(data, {
        bike: {
          connect: {
            id: validated.data.bikeId,
          },
        },
      });
    }

    // カテゴリーが選択されている場合
    if (validated.data.maintenanceCategoryId) {
      Object.assign(data, {
        maintenanceCategory: {
          connect: {
            id: validated.data.maintenanceCategoryId,
          },
        },
      });
    }

    // アップロードした画像がある場合
    if (
      validated.data.maintenanceRecordImageUrls &&
      validated.data.maintenanceRecordImageUrls?.length > 0
    ) {
      Object.assign(data, {
        maintenanceRecordImages: {
          create: validated.data.maintenanceRecordImageUrls.map((imageUrl) => {
            return { imageUrl };
          }),
        },
      });
    }

    const result = await prisma.maintenanceRecord.create({ data });

    if (result) {
      return NextResponse.json({ message: "Success" }, { status: 201 });
    } else {
      return NextResponse.json({ message: "Not Found" }, { status: 404 });
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
