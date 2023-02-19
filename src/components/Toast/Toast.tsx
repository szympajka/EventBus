import * as React from 'react';
import * as RadixToast from '@radix-ui/react-toast';
import './Toast.css';
import { useRegisterComponent } from '../useEventBusEvent';
import { ToastCustomEvent, ToastCustomEventDetail } from './Toast.types';
import { useEventBus } from '@/packages/EventBus.hooks';

export const Toast = ({ id, message }: ToastCustomEventDetail) => {
  const ref = React.useRef(null);
  const stage = useEventBus<ToastCustomEvent>();

  const onOpenChange = () => {
    stage.emit('remove', { detail: { id } })
  }

  useRegisterComponent<ToastCustomEvent>(ref, { detail: { id }});

  return (
    <RadixToast.Root ref={ref} className="ToastRoot" defaultOpen onOpenChange={onOpenChange}>
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