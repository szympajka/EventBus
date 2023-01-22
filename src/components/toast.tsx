import * as React from 'react';
import * as RadixToast from '@radix-ui/react-toast';
import { stage } from '@/packages/eventbus';
import { ToastCustomEvent, ToastCustomEventDetail } from './toastProvider';
import './toast.css';
import { useRegisterComponent } from './useStageEvent';

export const Toast = ({ id, message }: ToastCustomEventDetail) => {
  const onOpenChange = () => {
    stage.emit<ToastCustomEvent>('removeToast', { detail: { id } })
  }

  useRegisterComponent<ToastCustomEvent>('Toast', { detail: { id }});

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