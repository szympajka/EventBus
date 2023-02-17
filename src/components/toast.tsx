import * as React from 'react';
import * as RadixToast from '@radix-ui/react-toast';
import { useEventBus } from '@/packages/eventbus';
import { ToastCustomEvent, ToastCustomEventDetail, ToastIdentity } from './toastProvider';
import './toast.css';
import { useRegisterComponent } from './useEventBusEvent';

export const Toast = ({ id, message }: ToastCustomEventDetail) => {
  const stage = useEventBus<ToastCustomEvent>(ToastIdentity);

  const onOpenChange = () => {
    stage.emit('remove', { detail: { id } })
  }

  useRegisterComponent<ToastCustomEvent>(ToastIdentity, 'Toast', { detail: { id }});

  return (
    <RadixToast.Root className="ToastRoot" defaultOpen onOpenChange={onOpenChange}>
      <RadixToast.Title className="ToastTitle">Scheduled: Catch up</RadixToast.Title>
      <RadixToast.Description asChild>
        <div>
          <code>{id}</code>
          {message ? <code>{message}</code> : null}
        </div>
      </RadixToast.Description>
      <RadixToast.Action className="ToastAction" asChild altText="Goto schedule to undo">
        <button className="Button small green">Undo</button>
      </RadixToast.Action>
    </RadixToast.Root>
  );
};