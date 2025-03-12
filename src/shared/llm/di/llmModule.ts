import { ContainerModule } from 'inversify'
import { LlmApiKeyService } from 'src/shared/llm/services/LlmApiKeyService'
import { LlmTypes } from 'src/shared/llm/di/LlmTypes'
import { LlmApiKeyViewModel } from 'src/shared/llm/viewModels/LlmApiKeyViewModel'

export const llmModule = new ContainerModule((options) => {
  options.bind(LlmTypes.ApiKeyService).to(LlmApiKeyService).inSingletonScope()
  options.bind(LlmTypes.ApiKeyViewModel).to(LlmApiKeyViewModel)
})
