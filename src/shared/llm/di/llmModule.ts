import { ContainerModule } from 'inversify'
import { LlmApiKeyService } from 'src/shared/llm/apiKey/services/LlmApiKeyService'
import { LlmTypes } from 'src/shared/llm/di/LlmTypes'

export const llmModule = new ContainerModule((options) => {
  options.bind(LlmTypes.ApiKeyService).to(LlmApiKeyService).inSingletonScope()
})
