import { useMemo } from "react";

export type EventBusEvent<D = unknown> = {
	identity: Symbol,
	name: string,
	type: string
	detail?: D
}

export interface CustomEventListener<T> {
	(evt: CustomEvent<T>): void;
}

export class EventBus extends EventTarget {
	#prefix: string;

	constructor (prefix: string) {
		super();

		this.#prefix = prefix;
	}

	#resolveEventName<E extends EventBusEvent>(identity: E['identity'], type: E['type']) {
		return `${this.#prefix}.${identity.toString()}.${type}`
	}

	emit<E extends EventBusEvent>(identity: E['identity'], type: E['type'], eventInitDict?: CustomEventInit<E['detail']> ) {
		this.dispatchEvent(new CustomEvent(this.#resolveEventName(identity, type), eventInitDict))
	}

	on<E extends EventBusEvent>(identity: E['identity'], type: E['type'], handler: CustomEventListener<E['detail']>, opts?: AddEventListenerOptions) {
		// @ts-expect-error
		this.addEventListener(this.#resolveEventName(identity, type), handler, opts);
	}

	off<E extends EventBusEvent>(identity: E['identity'], type: E['type'], handler: CustomEventListener<E['detail']>, opts?: EventListenerOptions) {
		// @ts-expect-error
		this.removeEventListener(this.#resolveEventName(identity, type), handler, opts)
	}
}

const eventBus = new EventBus('thc');

export const useEventBus = <E extends EventBusEvent>(identity: Symbol) => {
	return useMemo(() => ({
		emit: (type: E['type'], eventInitDict?: CustomEventInit<E['detail']>) => eventBus.emit<E>(identity, type, eventInitDict),
		on: (type: E['type'], handler: CustomEventListener<E['detail']>, opts?: AddEventListenerOptions) => eventBus.on<E>(identity, type, handler, opts),
		off: (type: E['type'], handler: CustomEventListener<E['detail']>, opts?: EventListenerOptions) => eventBus.on<E>(identity, type, handler, opts),
	}), [identity])
}
