import { CustomEventListener, StageManagerEvent, useStage } from "@/packages/eventbus";
import { useEffect, useRef } from "react";

const useStaticDependencyRef = <T>(handler: T) => {
  const handleRef = useRef(handler);

  useEffect(() => {
    handleRef.current = handler;
  })

  return handleRef;
}

export const useStageEvent = <E extends StageManagerEvent>(identity: Symbol, type: E['type'], handler: CustomEventListener<E['detail']>) => {
  const stage = useStage<E>(identity);
  const staticHandle = useStaticDependencyRef(handler);

  useEffect(() => {
    const { current } = staticHandle;

    stage.on(type, current);

    return () => {
      stage.off(type, current);
    }
  }, [stage, type, staticHandle])
}

export const useRegisterComponent = <E extends StageManagerEvent>(identity: Symbol, name: E['name'], eventInitDict?: CustomEventInit<E['detail']> ) => {
  const stage = useStage<E>(identity);

  useEffect(() => {
    stage.emit('mount', eventInitDict);

    return () => {
      stage.emit('unmount', eventInitDict);
    }
  }, [eventInitDict, name, stage]);
}
