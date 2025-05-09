import type { IPubSubEvent } from 'src/shared/eventAggregator/interfaces/IPubSubEvent'
import type { ISubscription } from 'src/shared/eventAggregator/interfaces/ISubscription'

export interface IEventAggregator {
  subscribe<Payload>(
    eventClass: new <Payload>(payload: Payload) => IPubSubEvent<Payload>,
    callback: (e: IPubSubEvent<Payload>) => Promise<void>,
  ): ISubscription

  unsubscribe<Payload>(
    eventClass: new <Payload>(payload: Payload) => IPubSubEvent<Payload>,
    callback: (e: IPubSubEvent<Payload>) => Promise<void>,
  ): void

  publish<Payload>(event: IPubSubEvent<Payload>): void
}
