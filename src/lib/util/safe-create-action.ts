import { flattenError, ZodType } from "zod/v4";
import { $ZodFlattenedError } from "zod/v4/core";

export type ActionState<TInput, TOutput> = {
  flattenedError?: $ZodFlattenedError<TInput, string>;
  error?: string | null;
  data?: TOutput;
};

export const safeCreateAction = <TInput, TOutput>(
  schema: ZodType<TInput>,
  handler: (validatedData: TInput) => Promise<ActionState<TInput, TOutput>>
) => {
  return async (data: TInput): Promise<ActionState<TInput, TOutput>> => {
    const validationResult = schema.safeParse(data);
    if (!validationResult.success) {
      return {
        flattenedError: flattenError(validationResult.error),
      };
    }
    return handler(validationResult.data);
  };
};
