import { Injectable } from '@nestjs/common';
import { EnvService } from 'src/env/env.service';
import { OpenAI } from 'openai';
import OpenAIApi from 'openai';
import { LoggingService } from '../logging/logging.service';

@Injectable()
export class OpenAiserviceService {
  private openai: OpenAIApi;

  /**
   *
   */
  constructor(
    private readonly envSerivce: EnvService,
    private readonly logger: LoggingService,
  ) {
    this.logger.setContext('OpenAiserviceService');
    this.openai = new OpenAI({
      apiKey: this.envSerivce.get('OPENAI_API_KEY'),
    });
  }

  async generateResponse(
    prompt: string,
  ): Promise<OpenAI.Chat.ChatCompletion | undefined> {
    try {
      const params: OpenAI.Chat.ChatCompletionCreateParams = {
        messages: [{ role: 'user', content: prompt }],
        model: 'gpt-3.5-turbo',
      };

      const chatCompletion: OpenAI.Chat.ChatCompletion =
        await this.openai.chat.completions.create(params);
      if (!chatCompletion) {
        return undefined;
      }
      return chatCompletion;
    } catch (error) {
      this.logger.handleError(error, `#generateResponse`);
    }
  }
}
