import { Controller } from '@nestjs/common';
import { TsRest, TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { contract } from '@ckm/contracts';
import { AnalyticsService } from './analytics.service';
import { LoggingService } from '../logging/logging.service';

@TsRest({ jsonQuery: true })
@Controller()
export class AnalyticsController {
  constructor(
    private readonly analyticsService: AnalyticsService,
    private readonly logger: LoggingService,
  ) {
    this.logger.setContext('AnalyticsController');
  }

  @TsRestHandler(contract.analytics.getFoodCostHistory)
  async getFoodCostHistory() {
    return tsRestHandler(contract.analytics.getFoodCostHistory, async ({ query }) => {
      this.logger.log('Received request to get food cost history');
      const history = await this.analyticsService.getFoodCostHistory(
        parseInt(query.recipeId),
        new Date(query.startDate),
        new Date(query.endDate),
      );
      return { status: 200, body: history };
    });
  }

  @TsRestHandler(contract.analytics.getPrepHistory)
  async getPrepHistory() {
    return tsRestHandler(contract.analytics.getPrepHistory, async ({ query }) => {
      this.logger.log('Received request to get prep history');
      const history = await this.analyticsService.getPrepHistory(
        parseInt(query.recipeId),
        new Date(query.startDate),
        new Date(query.endDate),
      );
      return { status: 200, body: history };
    });
  }

  @TsRestHandler(contract.analytics.getMenuAnalytics)
  async getMenuAnalytics() {
    return tsRestHandler(contract.analytics.getMenuAnalytics, async ({ query }) => {
      this.logger.log('Received request to get menu analytics');
      const analytics = await this.analyticsService.getMenuAnalytics(parseInt(query.menuId));
      return { status: 200, body: analytics };
    });
  }
}
