import { StrikeStatement } from 'src/types/StrikeStatement';
import { z } from 'zod';

export function StrikeStatementSchema(
  data: Record<string, any>[]
): StrikeStatement[] {
  const schema = z.array(
    z.object({
      reference: z.string(),
      dateAndTime: z.string(),
      transactionType: z.string(),
      amountUsd: z.string(),
      feeUsd: z
        .string()
        .nullable()
        .transform((val) => val ?? '0'),
      amountBtc: z.string(),
      feeBtc: z
        .string()
        .nullable()
        .transform((val) => val ?? '0'),
      btcPrice: z.string(),
      costBasis: z.string(),
      destination: z
        .string()
        .nullable()
        .transform((val) => val ?? ''),
      description: z
        .string()
        .nullable()
        .transform((val) => val ?? ''),
      note: z
        .string()
        .nullable()
        .transform((val) => val ?? ''),
    })
  );

  return schema.parse(data) as StrikeStatement[];
}
