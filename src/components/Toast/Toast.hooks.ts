import { useEventBus } from "@/packages/EventBus.hooks";
import { useCallback } from "react";
import { useEventBusEvent } from "../useEventBusEvent";
import { generateUEID } from "./Toast.helpers";
import { ToastCustomEvent, ToastCustomEventDetail, useToastAddProps } from "./Toast.types";

export const useToastEvent = (...p: Parameters<typeof useEventBusEvent<ToastCustomEvent>>) => {
  return useEventBusEvent<ToastCustomEvent>(...p)
}

export function useToast() {
  const stage = useEventBus<ToastCustomEvent>();

  const add = useCallback(({ message }: useToastAddProps) => {
    stage.emit('add', { detail: { id: generateUEID(), message } })
  }, [stage]);

  const remove = useCallback((detail: ToastCustomEventDetail) => {
    stage.emit('remove', { detail })
  }, [stage]);

  return { add, remove }
}