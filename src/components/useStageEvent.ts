import { CustomEventListener, stage, StageManagerEvent } from "@/packages/eventbus";
import { useEffect, useRef } from "react";
import { ToastCustomEvent } from "./toastProvider";

const useStaticDependencyRef = <T>(handler: T) => {
  const handleRef = useRef(handler);

  useEffect(() => {
    handleRef.current = handler;
  })

  return handleRef;
}

export const useStageEvent = <E extends StageManagerEvent>(type: E['type'], handler: CustomEventListener<E['detail']>) => {
  const staticHandle = useStaticDependencyRef(handler);

  useEffect(() => {
    const { current } = staticHandle;

    stage.on(type, current);

    return () => {
      stage.off(type, current);
    }
  }, [type, staticHandle])
}

export const useRegisterComponent = <E extends StageManagerEvent>(name: E['name'], eventInitDict?: CustomEventInit<E['detail']> ) => {
  useEffect(() => {
    stage.emit<E>(`mount${name}`, eventInitDict);

    return () => {
      stage.emit<E>(`unmount${name}`, eventInitDict);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
