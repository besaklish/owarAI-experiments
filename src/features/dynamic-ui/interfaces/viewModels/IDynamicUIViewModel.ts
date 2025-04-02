import type { IViewModel } from 'src/shared/viewModels/interface/IViewModel'
import type { ObservableProps } from 'src/shared/viewModels/interface/ObservableProps'
import type { Observable } from 'rxjs'

export interface IDynamicUIViewModelProps {
  errorMessage: string
  generatedScript: string
}

export interface IDynamicUIViewModel extends IViewModel, ObservableProps<IDynamicUIViewModelProps> {
  errorMessage$: Observable<string>
  generatedScript$: Observable<string>
  generateInnerHtml(): Promise<void>
}
