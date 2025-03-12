import type { IViewModel } from 'src/shared/viewModels/interface/IViewModel'
import { onMounted, onUnmounted } from 'vue'

export const useViewModelLifecycleHooks = <T extends IViewModel>(vm: T): void => {
  onMounted(async () => {
    await vm.load()
  })

  onUnmounted(async () => {
    await vm.unload()
  })
}
