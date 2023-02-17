'use client'
import { Button, ButtonCustomEvent, ButtonIdentity } from "@/components/button";

import { ToastCustomEvent, ToastIdentity, ToastProvider, useToast } from "@/components/toastProvider";
import { useEventBusEvent } from "@/components/useEventBusEvent";

export default function Home() {
  const { add } = useToast();

  useEventBusEvent<ToastCustomEvent>(ToastIdentity, 'mount', ({ detail }) => console.log('mount', detail));
  useEventBusEvent<ButtonCustomEvent>(ButtonIdentity, 'mount', () => console.log('mounted'));
  useEventBusEvent<ToastCustomEvent>(ToastIdentity, 'unmount', ({ detail }) => console.log('unmount', detail));
  useEventBusEvent<ButtonCustomEvent>(ButtonIdentity,'unmount', () => console.log('unmounted'));
  useEventBusEvent<ButtonCustomEvent>(ButtonIdentity, 'onClick', ({ detail }) => console.log('onClick', detail));

  return (
    <ToastProvider>
      <h1>Hello</h1>
      <Button onClick={() => add({ message: 'welcome' })} tracking={{ eventName: 'customClick' }} />
    </ToastProvider>
  );
}