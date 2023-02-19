// Parameters<typeof useEventBusEvent<ToastCustomEvent>>

import { DOMAttributes } from "react";

export type Prettify<T> = {
	[K in keyof T]: T[K]
} & {}

export type DefaultEventType = 'mount' | 'unmount' | keyof DOMAttributes<Element>;

export type EventBusEventDefaults = {
	type: DefaultEventType;
	detail: {
    ref: React.MutableRefObject<Element>
  } | {};
}

export type EventBusEvent<Props extends {
	type?: string,
	detail?: unknown
} = {}> = {
	type: DefaultEventType | Props['type'];
	detail: Props['detail'];
}

export type CustomEventListener<T> = {
	(evt: CustomEvent<T>): void;
}

export type EventBusMethods = {
	resolveEventName: <E extends EventBusEvent = EventBusEvent<EventBusEventDefaults>>(type: E['type']) => `${string}.${string}`;
	emit: <E extends EventBusEvent = EventBusEvent<EventBusEventDefaults>>(type: E["type"], eventInitDict?: CustomEventInit<E["detail"]> | undefined) => void
	on: <E extends EventBusEvent = EventBusEvent<EventBusEventDefaults>>(type: E['type'], handler: CustomEventListener<E['detail']>, opts?: AddEventListenerOptions) => void;
	off: <E extends EventBusEvent = EventBusEvent<EventBusEventDefaults>>(type: E['type'], handler: CustomEventListener<E['detail']>, opts?: EventListenerOptions) => void;
}
