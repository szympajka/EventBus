'use client';
import { Button, ButtonCustomEvent } from "@/components/button";

import { ToastCustomEvent, ToastProvider, useToast } from "@/components/toastProvider";
import { useStageEvent } from "@/components/useStageEvent";

let i = 500;

export default function Home() {
  const { add } = useToast();

  useStageEvent<ToastCustomEvent>('mountToast', ({ detail }) => console.log(detail));
  useStageEvent<ButtonCustomEvent>('mountButton', () => console.log('mounted'));
  useStageEvent<ToastCustomEvent>('unmountToast', ({ detail }) => console.log(detail));
  useStageEvent<ButtonCustomEvent>('unmountButton', () => console.log('unmounted'));

  return (
    <ToastProvider>
      <h1>Hello</h1>
      <Button onClick={() => add({ message: 'welcome' })} />
    </ToastProvider>
  );
}