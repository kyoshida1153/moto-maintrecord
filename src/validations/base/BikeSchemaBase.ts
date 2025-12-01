import * as z from "zod";
import { ErrorMap } from "./ErrorMap";

z.setErrorMap(ErrorMap);

export const BikeSchemaBase = z.object({
  name: z
    .string()
    .min(1)
    .max(20)
    .refine(
      (value) => {
        if (!/^[\s]*$/.test(value)) return true;
      },
      {
        message: "スペース、改行、タブのみの内容は保存できません。",
      },
    ),

  imageUrl: z
    .string()
    .trim()
    .url()
    .startsWith(process.env.NEXT_PUBLIC_SUPABASE_URL!)
    .nullable()
    .optional(),

  mileage: z.preprocess((value) => {
    const valueStr = String(value);

    if (/^-?\d+$/.test(valueStr)) {
      return parseInt(valueStr);
    } else if (valueStr === "") {
      return null;
    }
    return value;
  }, z.number().int().min(0).max(999999).optional().nullable()),

  memo: z.preprocess(
    (value) => {
      if (value === "") return null;
      return value;
    },
    z
      .string()
      .max(500)
      .optional()
      .nullable()
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
});
