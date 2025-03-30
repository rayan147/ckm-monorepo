import { z } from 'zod';
import { zodSchemas } from '@ckm/db';


export type OrganizationCreateInput = z.infer<typeof zodSchemas.OrganizationCreateInputSchema>;
export type OrganizationUpdateInput = z.infer<typeof zodSchemas.OrganizationUpdateInputSchema>;
