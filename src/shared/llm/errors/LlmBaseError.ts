import type { LlmErrorNameEnum } from 'src/shared/llm/errors/LlmErrorNameEnum'

export abstract class LlmBaseError extends Error {
  abstract name: LlmErrorNameEnum
  cause?: unknown

  constructor(
    public readonly message: string,
    options?: { cause: unknown },
  ) {
    super(message)
    this.cause = options?.cause
  }
}
