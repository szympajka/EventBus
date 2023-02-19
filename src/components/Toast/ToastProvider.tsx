'use client';
import { ReactNode, useState } from "react";

import * as RadixToast from '@radix-ui/react-toast';
import { Toast } from "./Toast";
import { useToastEvent } from "./Toast.hooks";
import { ToastCustomEventDetail } from "./Toast.types";

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Array<ToastCustomEventDetail>>([]);

  useToastEvent('add', ({ detail }) => {
    setToasts((state) => state.concat([detail]));
  });

  useToastEvent('remove', ({ detail }) => {
    setToasts((state) => state.filter((t) => t.id !== detail.id));
  });

  return (
    <RadixToast.Provider swipeDirection="right" duration={3000}>
      {children}
      {toasts.map(({ id, message }) =>
        <Toast key={id} id={id} message={message} />
      )}
      <RadixToast.Viewport className="ToastViewport" />
    </RadixToast.Provider>
  );
}
