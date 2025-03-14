import type { Result } from 'src/shared/result/Result'
import type { z } from 'zod'

export interface OpenAILlmRequestBase {
  input: string | string[]
  instructions?: string
  model: string
}

export interface OpenAILlmRequest extends OpenAILlmRequestBase {
  temperature?: number
  max_output_tokens?: number
  user?: string
}

export interface OpenAIToolsRequest extends OpenAILlmRequest {
  tools: Array<{
    name: string
    parameters: z.ZodType<unknown, z.ZodTypeDef, unknown>
  }>
}

export interface OpenAITextFormatRequest extends OpenAILlmRequest {
  text: {
    format: {
      schema: z.ZodType<unknown, z.ZodTypeDef, unknown>
      name: string
    }
  }
}

export interface ILlmApiService {
  /**
   * Call the OpenAI API with a tools request to get structured output
   * @param request The request parameters
   * @returns A Result containing the parsed response or an error
   */
  callWithTools<T extends z.ZodType<unknown, z.ZodTypeDef, unknown>>(
    request: OpenAIToolsRequest,
  ): Promise<Result<z.infer<T>, Error>>

  /**
   * Call the OpenAI API with a text format request to get structured output
   * @param request The request parameters
   * @returns A Result containing the parsed response or an error
   */
  callWithTextFormat<T extends z.ZodType<unknown, z.ZodTypeDef, unknown>>(
    request: OpenAITextFormatRequest,
  ): Promise<Result<z.infer<T>, Error>>
}
