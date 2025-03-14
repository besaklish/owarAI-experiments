import type {
  ILlmApiService,
  OpenAILlmRequestBase,
  OpenAIToolsRequest,
  OpenAITextFormatRequest,
} from 'src/shared/llm/interfaces/services/ILlmApiService'
import OpenAI from 'openai'
import { zodResponsesFunction, zodTextFormat } from 'openai/helpers/zod'
import { inject, injectable } from 'inversify'
import { LlmTypes } from 'src/shared/llm/di/LlmTypes'
import type { ILlmApiKeyService } from 'src/shared/llm/interfaces/services/ILlmApiKeyService'
import { ok, err, type Result } from 'src/shared/result/Result'
import type { z } from 'zod'

@injectable()
export class LlmApiService implements ILlmApiService {
  private defaultOptions: OpenAILlmRequestBase = {
    input: '',
    instructions: '',
    model: 'gpt-4o-2024-08-06',
  }

  constructor(@inject(LlmTypes.ApiKeyService) private apiKeyService: ILlmApiKeyService) {}

  /**
   * Call the OpenAI API with a tools request to get structured output
   * @param request The request parameters
   * @returns A Result containing the parsed response or an error
   */
  async callWithTools<T extends z.ZodType<unknown, z.ZodTypeDef, unknown>>(
    request: OpenAIToolsRequest,
  ): Promise<Result<z.infer<T>, Error>> {
    try {
      const apiKeyResult = this.apiKeyService.getApiKey()
      if (!apiKeyResult.isOk) {
        return err(new Error('API key not found'))
      }
      const apiKey = apiKeyResult.value

      const client = new OpenAI({ apiKey })

      // Extract the first tool from the request
      const firstTool = request.tools[0]
      if (!firstTool) {
        return err(new Error('No tools provided in the request'))
      }

      // Create a tool using zodResponsesFunction
      const tool = zodResponsesFunction({
        name: firstTool.name,
        parameters: firstTool.parameters as T,
      })

      // Call the OpenAI API
      const response = await client.responses.parse({
        model: request.model,
        input: typeof request.input === 'string' ? request.input : request.input[0],
        instructions: request.instructions,
        tools: [tool],
        temperature: request.temperature,
        max_output_tokens: request.max_output_tokens,
        user: request.user,
      })

      // Extract the function call from the response
      const functionCall = response.output[0]
      if (!functionCall || functionCall.type !== 'function_call') {
        return err(new Error('Expected function call in response'))
      }

      // Return the parsed arguments
      return ok(functionCall.parsed_arguments as z.infer<T>)
    } catch (error) {
      return err(error instanceof Error ? error : new Error(String(error)))
    }
  }

  /**
   * Call the OpenAI API with a text format request to get structured output
   * @param request The request parameters
   * @returns A Result containing the parsed response or an error
   */
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
        input: typeof request.input === 'string' ? request.input : request.input[0],
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
