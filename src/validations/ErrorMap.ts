import * as z from "zod";

export const ErrorMap: z.ZodErrorMap = (issue, ctx) => {
  if (issue.code === z.ZodIssueCode.invalid_type) {
    switch (issue.expected) {
      case "string":
        if (issue.received === "undefined") {
          return { message: "入力は必須です。" };
        } else {
          return { message: "文字を入力してください。" };
        }
      case "number":
        return { message: "半角数字を入力してください。" };
      default:
        break;
    }
    return { message: "入力は必須です。" };
  }

  if (issue.code === z.ZodIssueCode.too_small) {
    switch (issue.type) {
      case "string":
        if (issue.minimum === 1) {
          return { message: "入力は必須です。" };
        } else {
          return { message: `${issue.minimum}文字以上で入力してください。` };
        }
      case "number":
        return { message: `${issue.minimum}以上の数値で入力してください。` };
      default:
        break;
    }
  }

  if (issue.code === z.ZodIssueCode.too_big) {
    switch (issue.type) {
      case "string":
        return { message: `${issue.maximum}文字以下で入力してください。` };
      case "number":
        return { message: `${issue.maximum}以下の数値で入力してください。` };
      default:
        break;
    }
  }

  return { message: ctx.defaultError };
};
