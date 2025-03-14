import { ContainerModule } from 'inversify'
import { NormTwistScriptTypes } from 'src/features/script.norm-twist/di/NormTwistScriptTypes'
import type { INormTwistScriptViewModel } from 'src/features/script.norm-twist/interfaces/viewModels/INormTwistScriptViewModel'
import { NormTwistScriptViewModel } from 'src/features/script.norm-twist/viewModels/NormTwistScriptViewModel'

export const normTwistScriptModule = new ContainerModule((options) => {
  options
    .bind<INormTwistScriptViewModel>(NormTwistScriptTypes.ViewModel)
    .to(NormTwistScriptViewModel)
})
