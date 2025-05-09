import { Observable } from 'rxjs'
import type { IViewModel } from 'src/shared/viewModels/interface/IViewModel'
import type { ComputedRef } from 'vue'
import { computed, onUnmounted, ref } from 'vue'

/**
 * PickObservableProps
 * - Type Arguments
 *  - ViewModel that implements IViewModel
 * - Returns a type that represents the Observable properties of the ViewModel
 * - Returns never if the props are not Observable
 */
type PickObservableProps<VM> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [K in keyof VM as VM[K] extends Observable<any> ? K : never]: VM[K]
}

type UnwrapObservable<T> = T extends Observable<infer U> ? U : never

/**
 * useObservableProps
 * - Arguments
 *  - ViewModel that implements IViewModel
 *  - Observable property name of ViewModel, inferrable from ViewModel
 * - Returns a Vue computed ref that updates when the Observable nexts a value
 */
export const useObservableProps = <
  VM extends IViewModel,
  Key extends keyof PickObservableProps<VM>,
  PickedPropType extends UnwrapObservable<PickObservableProps<VM>[Key]>,
>(
  viewModel: VM,
  propertyName: Key,
): ComputedRef<PickedPropType> => {
  const observable = viewModel[propertyName] as Observable<PickedPropType>
  const refProperty = ref<PickedPropType | undefined>(undefined)

  const subscription = observable.subscribe((value) => {
    refProperty.value = value
  })

  const computedProperty = computed<PickedPropType>(() => refProperty.value)

  onUnmounted(() => {
    subscription.unsubscribe()
  })

  return computedProperty
}
