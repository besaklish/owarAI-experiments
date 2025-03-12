import { ContainerModule } from 'inversify'
import { EventAggregatorTypes } from 'src/shared/eventAggregator/di/EventAggregatorTypes'
import { EventAggregator } from 'src/shared/eventAggregator/EventAggregator'

export const eventAggregatorModule = new ContainerModule((options) => {
  options.bind(EventAggregatorTypes.EventAggregator).to(EventAggregator).inSingletonScope()
})
