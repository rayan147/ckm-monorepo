import { Controller } from '@nestjs/common';
import { TsRest, TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { contract } from '@ckm/contracts';
import { VendorService } from './vendor.service';

@TsRest({ jsonQuery: true })
@Controller()
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @TsRestHandler(contract.vendor.createVendor)
  async createVendor() {
    return tsRestHandler(contract.vendor.createVendor, async ({ body }) => {
      const vendor = await this.vendorService.createVendor(body);
      return { status: 201, body: vendor };
    });
  }

  @TsRestHandler(contract.vendor.getVendors)
  async getVendors() {
    return tsRestHandler(contract.vendor.getVendors, async ({ query }) => {
      const vendors = await this.vendorService.getVendors({
        skip: query.skip ? parseInt(query.skip) : undefined,
        take: query.take ? parseInt(query.take) : undefined,
        name: query.name,
      });
      return { status: 200, body: vendors };
    });
  }

  @TsRestHandler(contract.vendor.getVendor)
  async getVendor() {
    return tsRestHandler(contract.vendor.getVendor, async ({ params }) => {
      const vendor = await this.vendorService.getVendor(params.id);
      if (!vendor) {
        return { status: 404, body: { message: 'Vendor not found' } };
      }
      return { status: 200, body: vendor };
    });
  }

  @TsRestHandler(contract.vendor.updateVendor)
  async updateVendor() {
    return tsRestHandler(contract.vendor.updateVendor, async ({ params, body }) => {
      const vendor = await this.vendorService.updateVendor(params.id, body);
      if (!vendor) {
        return { status: 404, body: { message: 'Vendor not found' } };
      }
      return { status: 200, body: vendor };
    });
  }

  @TsRestHandler(contract.vendor.deleteVendor)
  async deleteVendor() {
    return tsRestHandler(contract.vendor.deleteVendor, async ({ params }) => {
      const vendor = await this.vendorService.deleteVendor(params.id);
      if (!vendor) {
        return { status: 404, body: { message: 'Vendor not found' } };
      }
      return { status: 200, body: vendor };
    });
  }
}
