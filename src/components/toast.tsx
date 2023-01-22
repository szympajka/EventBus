import * as React from 'react';
import * as RadixToast from '@radix-ui/react-toast';
import { stage } from '@/packages/eventbus';
import { ToastCustomEvent } from './toastProvider';
import './toast.css';

export const Toast = ({ id }: { id: string }) => {
  const onOpenChange = () => {
    stage.emit<ToastCustomEvent>('removeToast', { detail: { id } })
  }

  React.useEffect(() => {
    stage.emit<ToastCustomEvent>('mountToast', { detail: { id }});

    return () => {
      stage.emit<ToastCustomEvent>('unmountToast', { detail: { id }});
    }
  }, [id])

  return (
    <RadixToast.Root className="ToastRoot" defaultOpen onOpenChange={onOpenChange}>
      <RadixToast.Title className="ToastTitle">Scheduled: Catch up</RadixToast.Title>
      <RadixToast.Description asChild>
        <code>{id}</code>
      </RadixToast.Description>
      <RadixToast.Action className="ToastAction" asChild altText="Goto schedule to undo">
        <button className="Button small green">Undo</button>
      </RadixToast.Action>
    </RadixToast.Root>
  );
};