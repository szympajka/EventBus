import { CustomEventListener, stage } from "@/packages/eventbus";
import { useEffect, useRef } from "react";
import { ToastCustomEvent } from "./toastProvider";

const useStaticDependencyRef = <T>(handler: T) => {
  const handleRef = useRef(handler);

  useEffect(() => {
    handleRef.current = handler;
  })

  return handleRef;
}

export const useStageEvent = <E extends ToastCustomEvent>(type: E['type'], handler: CustomEventListener<E['detail']>) => {
  const staticHandle = useStaticDependencyRef(handler);

  useEffect(() => {
    const { current } = staticHandle;

    stage.on(type, current);

    return () => {
      stage.off(type, current);
    }
  }, [type, staticHandle])
}
