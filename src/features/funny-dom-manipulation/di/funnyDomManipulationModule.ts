import { ContainerModule } from 'inversify'
import { FunnyDomManipulationTypes } from 'src/features/funny-dom-manipulation/di/FunnyDomManipulationTypes'
import type { IFunnyDomManipulationViewModel } from 'src/features/funny-dom-manipulation/interfaces/viewModels/IFunnyDomManipulationViewModel'
import { FunnyDomManipulationViewModel } from 'src/features/funny-dom-manipulation/viewModels/FunnyDomManipulationViewModel'

export const funnyDomManipulationModule = new ContainerModule((options) => {
  options
    .bind<IFunnyDomManipulationViewModel>(FunnyDomManipulationTypes.ViewModel)
    .to(FunnyDomManipulationViewModel)
})
