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

@injectable()
export class LlmApiService implements ILlmApiService {
  constructor(@inject(LlmTypes.ApiKeyService) private apiKeyService: ILlmApiKeyService) {}

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

      // Create a text format using zodTextFormat
      const format = zodTextFormat(request.text.format.schema as T, request.text.format.name)

      // Call the OpenAI API
      const response = await client.responses.parse({
        model: request.model,
        input: request.input,
        instructions: request.instructions,
        text: { format },
        temperature: request.temperature,
        max_output_tokens: request.max_output_tokens,
        user: request.user,
      })

      // Return the parsed output
      return ok(response.output_parsed as z.infer<T>)
    } catch (error) {
      return err(error instanceof Error ? error : new Error(String(error)))
    }
  }
}
