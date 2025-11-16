import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib";
import { Prisma } from "@prisma/client";
import { getCurrentUser } from "@/actions";

/* ###################################################################### */

// 取得

const maintenanceRecordUniqueSelect =
  Prisma.validator<Prisma.MaintenanceRecordSelect>()({
    id: true,
    bike: {
      select: { id: true, name: true },
    },
    maintenanceCategory: {
      select: { id: true, name: true },
    },
    calenderDate: true,
    isDone: true,
    title: true,
    cost: true,
    memo: true,
    mileage: true,
    maintenanceRecordImages: {
      select: { id: true, imageUrl: true },
      where: { deletedAt: null },
    },
  });

export type MaintenanceRecordUniqueSelect = Prisma.MaintenanceRecordGetPayload<{
  select: typeof maintenanceRecordUniqueSelect;
}>;

export async function GET(
  _request: NextRequest,
  context: RouteContext<"/api/maintenance-records/[id]">,
) {
  // 認証チェック
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const userId = currentUser.id;

  // ここからDB操作
  try {
    const { id } = await context.params;

    const result = await prisma.maintenanceRecord.findUnique({
      select: maintenanceRecordUniqueSelect,
      where: { id, userId },
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

// 編集

export type MaintenanceRecordUpdateInput = Prisma.MaintenanceRecordUpdateInput;

type MaintenanceRecordImageCreateInput =
  Prisma.MaintenanceRecordImageCreateInput;

export async function PUT(
  request: NextRequest,
  context: RouteContext<"/api/maintenance-records/[id]">,
) {
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
      calenderDate,
      isDone,
      title,
      cost,
      memo,
      mileage,
      maintenanceRecordImages,
      isChangedImages,
    } = await request.json();

    // 画像変更する場合: 紐づいてる画像レコードを論理削除
    const maintenanceRecordImagesUpdateMany = isChangedImages
      ? {
          where: {
            deletedAt: null,
          },
          data: {
            deletedAt: new Date(),
          },
        }
      : undefined;

    // アップロードした画像がある場合: 画像レコードを新規作成
    const maintenanceRecordImagesCreate =
      maintenanceRecordImages && maintenanceRecordImages.length > 0
        ? maintenanceRecordImages.map(
            (record: MaintenanceRecordImageCreateInput) => {
              return {
                imageUrl: record.imageUrl,
              };
            },
          )
        : undefined;

    const data: MaintenanceRecordUpdateInput = {
      bike: {
        connect: {
          id: bikeId,
        },
      },
      maintenanceCategory: {
        connect: {
          id: maintenanceCategoryId,
        },
      },
      calenderDate,
      isDone,
      title,
      cost,
      memo,
      mileage,
      maintenanceRecordImages: {
        updateMany: maintenanceRecordImagesUpdateMany,
        create: maintenanceRecordImagesCreate,
      },
    };

    const { id } = await context.params;
    const result = await prisma.maintenanceRecord.update({
      data,
      where: { id, userId },
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

// 削除（論理削除）

export async function DELETE(
  request: NextRequest,
  context: RouteContext<"/api/maintenance-records/[id]">,
) {
  // 認証チェック
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const userId = currentUser.id;

  // ここからDB操作
  try {
    // 型は編集のを使用
    const data: MaintenanceRecordUpdateInput = {
      deletedAt: new Date(),
    };

    const { id } = await context.params;
    const result = await prisma.maintenanceRecord.update({
      data,
      where: { id, userId },
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
