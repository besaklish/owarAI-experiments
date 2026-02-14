import type { Result } from 'src/shared/result/Result'
import type { z } from 'zod'

export interface OpenAILlmRequest {
  input: string
  instructions?: string
  model: string
  temperature?: number
  max_output_tokens?: number
  user?: string
}

export interface OpenAITextFormatRequest extends OpenAILlmRequest {
  text: {
    format: {
      schema: z.ZodTypeAny
      name: string
    }
  }
}

export interface ILlmApiService {
  callWithTextFormat<T extends z.ZodTypeAny>(
    request: OpenAITextFormatRequest,
  ): Promise<Result<z.infer<T>, Error>>
}
