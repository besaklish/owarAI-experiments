import type { IViewModel } from 'src/shared/viewModels/interface/IViewModel'
import type { ObservableProps } from 'src/shared/viewModels/interface/ObservableProps'
import type { Observable } from 'rxjs'

export interface IFunnyDomManipulationViewModelProps {
  errorMessage: string
  generatedScript: string
}

export interface IFunnyDomManipulationViewModel
  extends IViewModel,
    ObservableProps<IFunnyDomManipulationViewModelProps> {
  errorMessage$: Observable<string>
  generatedScript$: Observable<string>
  generateInnerHtml(): Promise<string>
}
