import { Controller } from '@nestjs/common';
import { TsRest, TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { contract } from '@ckm/contracts';
import { OrganizationService } from './organization.service';
import { Organization, UserRole } from '@ckm/db';
import { Auth } from '../decorators/auth.decorator';

@TsRest({ jsonQuery: true })
@Controller()
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Auth(UserRole.ADMIN)
  @TsRestHandler(contract.orgs.createOrganization)
  async createOrganization() {
    return tsRestHandler(contract.orgs.createOrganization, async ({ body }) => {
      const organization = await this.organizationService.createOrganization(body);
      return { status: 201, body: organization };
    });
  }

  @Auth(UserRole.ADMIN)
  @TsRestHandler(contract.orgs.getOrganizations)
  async getOrganizations() {
    return tsRestHandler(contract.orgs.getOrganizations, async ({ query }) => {
      const organizations = await this.organizationService.getOrganizations({
        skip: query.skip ? parseInt(query.skip) : undefined,
        take: query.take ? parseInt(query.take) : undefined,
        orderBy: query.orderBy as keyof Organization | undefined,
      });
      return { status: 200, body: organizations };
    });
  }

  @Auth(UserRole.ADMIN, UserRole.MANAGER)
  @TsRestHandler(contract.orgs.getOrganization)
  async getOrganization() {
    return tsRestHandler(contract.orgs.getOrganization, async ({ params }) => {
      const organization = await this.organizationService.getOrganization(params.id);
      if (!organization) {
        return { status: 404, body: { message: 'Organization not found' } };
      }
      return { status: 200, body: organization };
    });
  }

  @Auth(UserRole.ADMIN)
  @TsRestHandler(contract.orgs.updateOrganization)
  async updateOrganization() {
    return tsRestHandler(contract.orgs.updateOrganization, async ({ params, body }) => {
      const organization = await this.organizationService.updateOrganization(params.id, body);
      return { status: 200, body: organization };
    });
  }

  @Auth(UserRole.ADMIN)
  @TsRestHandler(contract.orgs.deleteOrganization)
  async deleteOrganization() {
    return tsRestHandler(contract.orgs.deleteOrganization, async ({ params }) => {
      const organization = await this.organizationService.deleteOrganization(params.id);
      return { status: 200, body: organization };
    });
  }
}
