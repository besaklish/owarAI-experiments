import type { Result } from 'src/shared/result/Result'
import type { IViewModel } from 'src/shared/viewModels/interface/IViewModel'
import type { ObservableProps } from 'src/shared/viewModels/interface/ObservableProps'

export interface ILlmApiKeyViewModelProps {
  apiKey: string
  apiKeyErrorMessage: string
  shouldNotifyUser: boolean
  llmErrorMessage: string
}

export interface ILlmApiKeyViewModel extends IViewModel, ObservableProps<ILlmApiKeyViewModelProps> {
  validateApiKey(apiKey: string): boolean
  setApiKey(apiKey: string): void
  saveApiKeyIfValid(): Result<void>
  setShouldNotifyUser(shouldNotifyUser: boolean): void
}
