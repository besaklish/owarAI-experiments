import type { IViewModel } from 'src/shared/viewModels/interface/IViewModel'
import type { Result } from 'src/shared/result/Result'
import type { ObservableProps } from 'src/shared/viewModels/interface/ObservableProps'

export interface INormTwistScriptViewModelProps {
  theme: string
  errorMessage: string
  generatedScript: string
}

export interface INormTwistScriptViewModel
  extends IViewModel,
    ObservableProps<INormTwistScriptViewModelProps> {
  setTheme(theme: string): void
  generateScript(): Promise<Result<string>>
}
