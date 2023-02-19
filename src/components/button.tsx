import { useEventBus } from '@/packages/EventBus.hooks';
import { ComponentProps, useRef } from 'react';
import { useRegisterComponent } from './useEventBusEvent';

type ButtonProps = ComponentProps<'button'> & {
  tracking: {
    eventName: string,
  }
};

export const Button = (props: ButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const stage = useEventBus();

  useRegisterComponent(ref);

  const { onClick: onClickFromParams, ...rest } = props;

  const onClick = (e: any) => {
    stage.emit('onClick', { detail: { eventAction: 'button_click', ...props.tracking } })

    onClickFromParams?.(e);
  }

  return (
    <button {...rest} ref={ref} onClick={onClick}>Label</button>
  )
}