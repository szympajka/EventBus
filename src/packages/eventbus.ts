import { useMemo } from "react";

export type StageManagerEvent<D = unknown> = {
	identity: Symbol,
	name: string,
	type: string
	detail?: D
}

export interface CustomEventListener<T> {
	(evt: CustomEvent<T>): void;
}

export class StageManager extends EventTarget {
	#prefix: string;

	constructor (prefix: string) {
		super();

		this.#prefix = prefix;
	}

	#resolveEventName<E extends StageManagerEvent>(identity: E['identity'], type: E['type']) {
		return `${this.#prefix}.${identity.toString()}.${type}`
	}

	emit<E extends StageManagerEvent>(identity: E['identity'], type: E['type'], eventInitDict?: CustomEventInit<E['detail']> ) {
		console.log(this.#resolveEventName(identity, type));
		this.dispatchEvent(new CustomEvent(this.#resolveEventName(identity, type), eventInitDict))
	}

	on<E extends StageManagerEvent>(identity: E['identity'], type: E['type'], handler: CustomEventListener<E['detail']>, opts?: AddEventListenerOptions) {
		// @ts-expect-error
		this.addEventListener(this.#resolveEventName(identity, type), handler, opts);
	}

	off<E extends StageManagerEvent>(identity: E['identity'], type: E['type'], handler: CustomEventListener<E['detail']>, opts?: EventListenerOptions) {
		// @ts-expect-error
		this.removeEventListener(this.#resolveEventName(identity, type), handler, opts)
	}
}

const stage = new StageManager('thc');

export const useStage = <E extends StageManagerEvent>(identity: Symbol) => {
	return useMemo(() => ({
		emit: (type: E['type'], eventInitDict?: CustomEventInit<E['detail']>) => stage.emit<E>(identity, type, eventInitDict),
		on: (type: E['type'], handler: CustomEventListener<E['detail']>, opts?: AddEventListenerOptions) => stage.on<E>(identity, type, handler, opts),
		off: (type: E['type'], handler: CustomEventListener<E['detail']>, opts?: EventListenerOptions) => stage.on<E>(identity, type, handler, opts),
	}), [identity])
}
