import { EventBusMethods } from "./EventBus.types";
export class EventBus extends EventTarget {
	#prefix: string;

	constructor (prefix: string) {
		super();

		this.#prefix = prefix;
	}

	#resolveEventName: EventBusMethods['resolveEventName'] = (type) => {
		return `${this.#prefix}.${type}`
	}

	emit: EventBusMethods['emit'] = (type, eventInitDict) => {
		this.dispatchEvent(new CustomEvent(this.#resolveEventName(type), eventInitDict))
	}

	on: EventBusMethods['on'] = (type, handler, opts) => {
		// @ts-expect-error
		this.addEventListener(this.#resolveEventName(type), handler, opts);
	}

	off: EventBusMethods['off'] = (type, handler, opts?) => {
		// @ts-expect-error
		this.removeEventListener(this.#resolveEventName(type), handler, opts)
	}
}

export const $eventBus = new EventBus('thc');

