import { zodSchemas } from '@ckm/db';
import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const c = initContract();


export const vendorContract = c.router({
  createVendor: {
    method: 'POST',
    path: '/vendors',
    responses: {
      201: zodSchemas.VendorSchema,
      400: z.object({ message: z.string() }),
    },
    body: zodSchemas.VendorCreateInputSchema,
    summary: 'Create a new vendor',
  },
  getVendors: {
    method: 'GET',
    path: '/vendors',
    responses: {
      200: z.array(zodSchemas.VendorSchema),
    },
    query: z.object({
      skip: z.string().optional(),
      take: z.string().optional(),
      name: z.string().optional(),
    }),
    summary: 'Get all vendors',
  },
  getVendor: {
    method: 'GET',
    path: '/vendors/:id',
    pathParams: z.object({
      id: z.coerce.number()
    }),
    responses: {
      200: zodSchemas.VendorSchema,
      404: z.object({ message: z.string() }),
    },
    summary: 'Get a vendor by ID',
  },
  updateVendor: {
    method: 'PUT',
    path: '/vendors/:id',
    pathParams: z.object({
      id: z.coerce.number()
    }),
    responses: {
      200: zodSchemas.VendorSchema,
      404: z.object({ message: z.string() }),
    },
    body: zodSchemas.VendorUpdateInputSchema,
    summary: 'Update a vendor',
  },
  deleteVendor: {
    method: 'DELETE',
    path: '/vendors/:id',
    pathParams: z.object({
      id: z.coerce.number()
    }),
    responses: {
      200: zodSchemas.VendorSchema,
      404: z.object({ message: z.string() }),
    },
    summary: 'Delete a vendor',
  },
});

