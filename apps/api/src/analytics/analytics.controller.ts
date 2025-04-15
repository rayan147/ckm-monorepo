import { Controller } from '@nestjs/common';
import { TsRest, TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { contract } from '@ckm/contracts';
import { AnalyticsService } from './analytics.service';
import { LoggingService } from '../logging/logging.service';
import { Auth } from '../decorators/auth.decorator';
import { UserRole } from '@ckm/db';

@TsRest({ jsonQuery: true })
@Controller()
export class AnalyticsController {
  constructor(
    private readonly analyticsService: AnalyticsService,
    private readonly logger: LoggingService,
  ) {
    this.logger.setContext('AnalyticsController');
  }

  @Auth(UserRole.ADMIN, UserRole.MANAGER, UserRole.CHEF)
  @TsRestHandler(contract.analytics.getFoodCostHistory)
  async getFoodCostHistory() {
    return tsRestHandler(contract.analytics.getFoodCostHistory, async ({ query }) => {
      this.logger.log('Received request to get food cost history');
      const history = await this.analyticsService.getFoodCostHistory(
        parseInt(query.recipeId),
        new Date(query.startDate),
        new Date(query.endDate),
      );
      return { status: 200, body: history || [] };
    });
  }

  @Auth(UserRole.ADMIN, UserRole.MANAGER, UserRole.CHEF)
  @TsRestHandler(contract.analytics.getPrepHistory)
  async getPrepHistory() {
    return tsRestHandler(contract.analytics.getPrepHistory, async ({ query }) => {
      this.logger.log('Received request to get prep history');
      const history = await this.analyticsService.getPrepHistory(
        parseInt(query.recipeId),
        new Date(query.startDate),
        new Date(query.endDate),
      );
      return { status: 200, body: history || [] };
    });
  }

  @Auth(UserRole.ADMIN, UserRole.MANAGER, UserRole.CHEF)
  @TsRestHandler(contract.analytics.getMenuAnalytics)
  async getMenuAnalytics() {
    return tsRestHandler(contract.analytics.getMenuAnalytics, async ({ query }) => {
      this.logger.log('Received request to get menu analytics');
      const analytics = await this.analyticsService.getMenuAnalytics(parseInt(query.menuId));
      
      if (!analytics) {
        // Create empty menu items that match the required schema
        const emptyMenuItem = {
          id: 0,
          name: 'No item',
          description: null,
          price: 0,
          menuId: parseInt(query.menuId),
          isActive: false,
          foodCost: 0,
          recipeIds: [],
          recipeServingsAmount: [],
          recipeServingsCost: [],
          allergens: [],
          categoryId: null,
          recipes: []
        };
        
        return { 
          status: 200, 
          body: {
            lowestCostItem: emptyMenuItem,
            highestCostItem: emptyMenuItem,
            averageFoodCost: 0
          } 
        };
      }
      
      return { status: 200, body: analytics };
    });
  }
}
