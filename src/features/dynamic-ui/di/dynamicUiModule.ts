import { ContainerModule } from 'inversify'
import { DynamicUITypes } from 'src/features/dynamic-ui/di/DynamicUITypes'
import type { IDynamicUIViewModel } from 'src/features/dynamic-ui/interfaces/viewModels/IDynamicUIViewModel'
import { DynamicUIViewModel } from 'src/features/dynamic-ui/viewModels/DynamicUIViewModel'

export const dynamicUiModule = new ContainerModule((options) => {
  options.bind<IDynamicUIViewModel>(DynamicUITypes.ViewModel).to(DynamicUIViewModel)
})
