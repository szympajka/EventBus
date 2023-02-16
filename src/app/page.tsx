'use client'
import { Button, ButtonCustomEvent, ButtonIdentity } from "@/components/button";

import { ToastCustomEvent, ToastIdentity, ToastProvider, useToast } from "@/components/toastProvider";
import { useStageEvent } from "@/components/useStageEvent";

export default function Home() {
  const { add } = useToast();

  useStageEvent<ToastCustomEvent>(ToastIdentity, 'mount', ({ detail }) => console.log('mount', detail));
  useStageEvent<ButtonCustomEvent>(ButtonIdentity, 'mount', () => console.log('mounted'));
  useStageEvent<ToastCustomEvent>(ToastIdentity, 'unmount', ({ detail }) => console.log('unmount', detail));
  useStageEvent<ButtonCustomEvent>(ButtonIdentity,'unmount', () => console.log('unmounted'));
  useStageEvent<ButtonCustomEvent>(ButtonIdentity, 'onClick', ({ detail }) => console.log('onClick', detail));

  return (
    <ToastProvider>
      <h1>Hello</h1>
      <Button onClick={() => add({ message: 'welcome' })} tracking={{ eventName: 'customClick' }} />
    </ToastProvider>
  );
}