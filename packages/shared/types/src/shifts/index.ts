import { zodSchemas } from '@ckm/db';
import type { Shift } from '@ckm/db';


const ShiftStatus = zodSchemas.ShiftStatusSchema
export const ShiftCreateInput = zodSchemas.ShiftCreateInputSchema

export type { Shift, ShiftStatus };
