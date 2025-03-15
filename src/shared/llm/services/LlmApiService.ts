import type {
  ILlmApiService,
  OpenAITextFormatRequest,
} from 'src/shared/llm/interfaces/services/ILlmApiService'
import OpenAI from 'openai'
import { zodTextFormat } from 'openai/helpers/zod'
import { inject, injectable } from 'inversify'
import { LlmTypes } from 'src/shared/llm/di/LlmTypes'
import type { ILlmApiKeyService } from 'src/shared/llm/interfaces/services/ILlmApiKeyService'
import { ok, err, type Result } from 'src/shared/result/Result'
import type { z } from 'zod'
import { EventAggregatorTypes } from 'src/shared/eventAggregator/di/EventAggregatorTypes'
import type { IEventAggregator } from 'src/shared/eventAggregator/interfaces/IEventAggregator'
import { ThrowLlmErrorEvent } from 'src/shared/llm/events/ThrowLlmErrorEvent'
import { LlmUnexpectedError } from 'src/shared/llm/errors/LlmUnexpectedError'

@injectable()
export class LlmApiService implements ILlmApiService {
  constructor(
    @inject(EventAggregatorTypes.EventAggregator) private ea: IEventAggregator,
    @inject(LlmTypes.ApiKeyService) private apiKeyService: ILlmApiKeyService,
  ) {}

  async callWithTextFormat<T extends z.ZodType<unknown, z.ZodTypeDef, unknown>>(
    request: OpenAITextFormatRequest,
  ): Promise<Result<z.infer<T>, Error>> {
    try {
      const apiKeyResult = this.apiKeyService.getApiKey()
      if (!apiKeyResult.isOk) {
        return err(new Error('API key not found'))
      }
      const apiKey = apiKeyResult.value

      const client = new OpenAI({ apiKey, dangerouslyAllowBrowser: true })

      const format = zodTextFormat(request.text.format.schema as T, request.text.format.name)

      const response = await client.responses.parse({
        model: request.model,
        input: request.input,
        instructions: request.instructions,
        text: { format },
        temperature: request.temperature,
        max_output_tokens: request.max_output_tokens,
        user: request.user,
      })

      return ok(response.output_parsed as z.infer<T>)
    } catch (error) {
      // TODO: Replace these if statement with more simple and concise logic
      // Such as using Zod or separating this logic to a function
      if (
        error &&
        typeof error === 'object' &&
        'status' in error &&
        'error' in error &&
        typeof error.error === 'object' &&
        error.error != null &&
        'message' in error.error &&
        typeof error.error.message === 'string'
      ) {
        this.ea.publish(
          new ThrowLlmErrorEvent(new LlmUnexpectedError(error.error.message, { cause: error })),
        )
      }

      return err(error instanceof Error ? error : new Error(String(error)))
    }
  }
}
