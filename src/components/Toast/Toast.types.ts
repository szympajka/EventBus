import { EventBusEvent } from "@/packages/EventBus.types";
import { ReactNode } from "react";

export type ToastCustomEventDetail = {
  id: string,
  message?: ReactNode
};

export type useToastAddProps = Omit<ToastCustomEventDetail, 'id'>

export type ToastCustomEventType = 'add' | 'remove'

export type ToastCustomEvent = EventBusEvent<{
  detail: ToastCustomEventDetail;
  type: ToastCustomEventType;
}>
