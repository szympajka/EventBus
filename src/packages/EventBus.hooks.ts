import { useMemo } from "react"
import { $eventBus } from "./eventbus"
import { EventBusEvent, EventBusEventDefaults } from "./EventBus.types"

export const useEventBus = <E extends EventBusEvent = EventBusEvent<EventBusEventDefaults>>() => {
	return useMemo(() => {

		return {
			emit: $eventBus.emit<E>,
			on: $eventBus.on<E>,
			off: $eventBus.off<E>,
		}
	}, [])
}