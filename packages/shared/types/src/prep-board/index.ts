import { zodSchemas } from '@ckm/db';
import { z } from 'zod';

export type PrepBoardCreate = z.infer<typeof zodSchemas.PrepBoardCreateInputSchema>
export type PrepBoardUpdate = z.infer<typeof zodSchemas.PrepBoardUpdateInputSchema>
