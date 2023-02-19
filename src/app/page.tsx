'use client'
import { Button } from "@/components/button";
import { KeyboardProvider } from "@/components/keyboard";
import { useToast } from "@/components/Toast/Toast.hooks";
import { ToastProvider } from "@/components/Toast/ToastProvider";

import { useEventBusEvent } from "@/components/useEventBusEvent";

export default function Home() {
  const { add } = useToast();

  useEventBusEvent('mount', (e) => console.log('mount', e));
  useEventBusEvent('unmount', (e) => console.log('unmount', e));
  useEventBusEvent('onClick', (e) => console.log('onClick', e));

  return (
    <ToastProvider>
      <KeyboardProvider />
      <h1>Hello</h1>
      <Button onClick={() => add({ message: 'welcome' })} tracking={{ eventName: 'customClick' }} />
    </ToastProvider>
  );
}