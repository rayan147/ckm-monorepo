import { array, z } from 'zod';
import { initContract } from '@ts-rest/core';
import { VendorSchema, VendorCreateSchema, VendorUpdateSchema } from '../../../types/src';

const c = initContract();


export const vendorContract = c.router({
  createVendor: {
    method: 'POST',
    path: '/vendors',
    responses: {
      201: VendorSchema,
      400: z.object({ message: z.string() }),
    },
    body: VendorCreateSchema,
    summary: 'Create a new vendor',
  },
  getVendors: {
    method: 'GET',
    path: '/vendors',
    responses: {
      200: z.array(VendorSchema),
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
      200: VendorSchema,
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
      200: VendorSchema,
      404: z.object({ message: z.string() }),
    },
    body: VendorUpdateSchema,
    summary: 'Update a vendor',
  },
  deleteVendor: {
    method: 'DELETE',
    path: '/vendors/:id',
    pathParams: z.object({
        id: z.coerce.number()
    }),
    responses: {
      200: VendorSchema,
      404: z.object({ message: z.string() }),
    },
    summary: 'Delete a vendor',
  },
});

