import { useEventBus } from "@/packages/EventBus.hooks";
import { CustomEventListener, EventBusEvent, EventBusEventDefaults } from "@/packages/EventBus.types";
import { useEffect, useRef } from "react";

const useStaticDependencyRef = <T>(handler: T) => {
  const handleRef = useRef(handler);
  handleRef.current = handler;
  return handleRef;
}

export const useEventBusEvent = <E extends EventBusEvent = EventBusEvent<EventBusEventDefaults>>(type: E['type'], handler: CustomEventListener<E['detail']>, refs?: React.MutableRefObject<Element>[]) => {
  const stage = useEventBus<E>();
  const staticHandle = useStaticDependencyRef(handler);

  useEffect(() => {
    const { current } = staticHandle;

    stage.on(type, current);

    return () => {
      stage.off(type, current);
    }
  }, [stage, type, staticHandle])
}

export const useRegisterComponent = <E extends EventBusEvent = EventBusEvent<EventBusEventDefaults>>(ref: React.RefObject<Element>, eventInitDict?: CustomEventInit<E['detail']> ) => {
  const stage = useEventBus<E>();

  useEffect(() => {
    stage.emit('mount', {
      ...eventInitDict,
      detail: {
        ...(eventInitDict?.detail ? eventInitDict.detail : {}),
        ref,
      }
    });

    return () => {
      stage.emit('unmount', {
        ...eventInitDict,
        detail: {
          ...(eventInitDict?.detail ? eventInitDict.detail : {}),
          ref,
        }
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
