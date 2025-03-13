import { Observable } from 'rxjs'
import type { IEventAggregator } from 'src/shared/eventAggregator/interfaces/IEventAggregator'
import type { IPubSubEvent } from 'src/shared/eventAggregator/interfaces/IPubSubEvent'

export interface IViewModel {
  isBusy$: Observable<boolean>
  setIsBusy(isBusy: boolean): void

  load(): Promise<void>
  unload(): Promise<void>

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  subscribe<T extends IPubSubEvent<any>>(
    ea: IEventAggregator,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    eventClass: new (...args: any[]) => T,
    callback: (e: T) => Promise<void>,
  ): void
  unsubscribe(): void
}
