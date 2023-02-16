'use client';
import { ReactNode, useCallback, useEffect, useId, useState } from "react";

import * as RadixToast from '@radix-ui/react-toast';
import { useStage } from "@/packages/eventbus";
import { useStageEvent } from "./useStageEvent";
import { Toast } from "./toast";

export type ToastCustomEventDetail = {
  id: string,
  message?: ReactNode
};

export type useToastAddProps = Omit<ToastCustomEventDetail, 'id'>

export type ToastCustomEventType = 'add' | 'remove' | 'mount' | 'unmount';

export const ToastIdentity = Symbol('Toast');

export type ToastCustomEvent = {
  identity: typeof ToastIdentity;
  name: 'Toast',
  detail: ToastCustomEventDetail,
  type: ToastCustomEventType,
}

export function generateUEID(): string {
  let first = ((Math.random() * 46656) | 0).toString(36);
  let second = ((Math.random() * 46656) | 0).toString(36);
  first = first.padStart(3, '0');
  second = second.padStart(3, '0');

  return first + second;
}

export function useToast() {
  const stage = useStage<ToastCustomEvent>(ToastIdentity);

  const add = useCallback(({ message }: useToastAddProps) => {
    stage.emit('add', { detail: { id: generateUEID(), message } })
  }, [stage]);

  const remove = useCallback((detail: ToastCustomEventDetail) => {
    stage.emit('remove', { detail })
  }, [stage]);

  return { add, remove }
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Array<ToastCustomEventDetail>>([]);

  useStageEvent<ToastCustomEvent>(ToastIdentity, 'add', ({ detail }) => {
    setToasts((state) => state.concat([detail]));
  });

  useStageEvent<ToastCustomEvent>(ToastIdentity, 'remove', ({ detail }) => {
    setToasts((state) => state.filter((t) => t.id !== detail.id));
  });

  return (
    <RadixToast.Provider swipeDirection="right" duration={1000}>
      {children}
      {toasts.map(({ id, message }) =>
        <Toast key={id} id={id} message={message} />
      )}
      <RadixToast.Viewport className="ToastViewport" />
    </RadixToast.Provider>
  );
}
