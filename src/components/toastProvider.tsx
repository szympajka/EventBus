'use client';
import { ReactNode, useCallback, useEffect, useId, useState } from "react";

import * as RadixToast from '@radix-ui/react-toast';
import { stage } from "@/packages/eventbus";
import { useStageEvent } from "./useStageEvent";
import { Toast } from "./toast";

export type ToastCustomEventDetail = {
  id: string,
  message?: ReactNode
};

export type useToastAddProps = Omit<ToastCustomEventDetail, 'id'>

export type ToastCustomEventType = 'addToast' | 'removeToast' | 'mountToast' | 'unmountToast';

export type ToastCustomEvent = {
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
  const add = useCallback(({ message }: useToastAddProps) => {
    stage.emit<ToastCustomEvent>('addToast', { detail: { id: generateUEID(), message } })
  }, []);

  const remove = useCallback((detail: ToastCustomEventDetail) => {
    stage.emit<ToastCustomEvent>('removeToast', { detail })
  }, []);

  return { add, remove }
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Array<ToastCustomEventDetail>>([]);

  useStageEvent<ToastCustomEvent>('addToast', ({ detail }) => {
    setToasts((state) => state.concat([detail]));
  });

  useStageEvent<ToastCustomEvent>('removeToast', ({ detail }) => {
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
