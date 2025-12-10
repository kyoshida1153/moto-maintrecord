import * as z from "zod";
import { ErrorMap } from "./ErrorMap";

z.setErrorMap(ErrorMap);

export const MaintenanceRecordSchemaBase = z.object({
  id: z.string().uuid(),

  bikeId: z.preprocess((value) => {
    if (value === "") return null;
    return value;
  }, z.string().uuid().nullable().optional()),

  maintenanceCategoryId: z.preprocess((value) => {
    if (value === "") return null;
    return value;
  }, z.string().uuid().nullable().optional()),

  calenderDate: z.date(),

  isDone: z.boolean(),

  title: z
    .string()
    .min(1)
    .max(50)
    .refine(
      (value) => {
        if (!/^[\s]*$/.test(value)) return true;
      },
      {
        message: "スペース、改行、タブのみの内容は保存できません。",
      },
    ),

  cost: z.preprocess((value) => {
    const valueStr = String(value);

    if (/^-?\d+$/.test(valueStr)) {
      return parseInt(valueStr);
    } else if (valueStr === "") {
      return null;
    }
    return value;
  }, z.number().int().min(0).max(99999999)),

  memo: z.preprocess(
    (value) => {
      if (value === "") return null;
      return value;
    },
    z
      .string()
      .max(500)
      .nullable()
      .optional()
      .refine(
        (value) => {
          if (value === undefined || value === null || !/^[\s]*$/.test(value))
            return true;
        },
        {
          message: "スペース、改行、タブのみの内容は保存できません。",
        },
      ),
  ),

  mileage: z.preprocess((value) => {
    const valueStr = String(value);

    if (/^-?\d+$/.test(valueStr)) {
      return parseInt(valueStr);
    } else if (valueStr === "") {
      return null;
    }
    return value;
  }, z.number().int().min(0).max(999999).nullable().optional()),

  maintenanceRecordImageUrls: z
    .array(
      z.string().trim().url().startsWith(process.env.NEXT_PUBLIC_SUPABASE_URL!),
    )
    .nullable()
    .optional(),
});
