import { injectable } from 'inversify'
import { BehaviorSubject } from 'rxjs'
import type { IEventAggregator } from 'src/shared/eventAggregator/interfaces/IEventAggregator'
import type { IPubSubEvent } from 'src/shared/eventAggregator/interfaces/IPubSubEvent'
import type { ISubscription } from 'src/shared/eventAggregator/interfaces/ISubscription'
import type { IViewModel } from 'src/shared/viewModels/interface/IViewModel'

@injectable()
export abstract class ViewModelBase implements IViewModel {
  protected _isBusy: BehaviorSubject<boolean> = new BehaviorSubject(false)
  public isBusy$ = this._isBusy.asObservable()

  private _subscriptions: ISubscription[] = []

  constructor() {}

  setIsBusy(value: boolean): void {
    this._isBusy.next(value)
  }

  load(): Promise<void> {
    return Promise.resolve()
  }

  unload(): Promise<void> {
    this.unsubscribe()
    return Promise.resolve()
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  subscribe<T extends IPubSubEvent<any>>(
    ea: IEventAggregator,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    eventClass: new (...args: any[]) => T,
    callback: (e: T) => Promise<void>,
  ): void {
    this._subscriptions.push(
      ea.subscribe(
        eventClass as new <P>(payload: P) => IPubSubEvent<P>,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        callback as (e: IPubSubEvent<any>) => Promise<void>,
      ),
    )
  }

  unsubscribe(): void {
    this._subscriptions.forEach((sub) => sub.unsubscribe())
  }
}
