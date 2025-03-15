import type { IPubSubEvent } from 'src/shared/eventAggregator/interfaces/IPubSubEvent'
import type { LlmBaseError } from 'src/shared/llm/errors/LlmBaseError'

export class ThrowLlmErrorEvent implements IPubSubEvent<LlmBaseError> {
  constructor(public readonly payload: LlmBaseError) {}
}
