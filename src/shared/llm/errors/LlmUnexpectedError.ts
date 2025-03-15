import { LlmBaseError } from 'src/shared/llm/errors/LlmBaseError'
import { LlmErrorNameEnum } from 'src/shared/llm/errors/LlmErrorNameEnum'

// TODO: Replace UnexpectedError with a more specific error
export class LlmUnexpectedError extends LlmBaseError {
  name = LlmErrorNameEnum.UnexpectedError
}
