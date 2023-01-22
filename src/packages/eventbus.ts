export type StageManagerEvent = {
	type: string
	detail: unknown
}

export interface CustomEventListener<T> {
	(evt: CustomEvent<T>): void;
}

export class StageManager extends EventTarget {
	constructor () {
		super();
	}

	on<E extends StageManagerEvent>(type: E['type'], handler: CustomEventListener<E['detail']>, opts?: AddEventListenerOptions) {
		// @ts-expect-error
		this.addEventListener(type, handler, opts)
	}

	off<E extends StageManagerEvent>(type: E['type'], handler: CustomEventListener<E['detail']>, opts?: EventListenerOptions) {
		// @ts-expect-error
		this.removeEventListener(type, handler, opts)
	}

	emit<E extends StageManagerEvent>(type: E['type'], eventInitDict?: CustomEventInit<E['detail']> ) {
		this.dispatchEvent(new CustomEvent(type, eventInitDict))
	}
}

export const stage = new StageManager();
