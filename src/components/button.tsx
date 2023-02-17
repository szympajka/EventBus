import { useEventBus } from '@/packages/eventbus';
import { ComponentProps, useEffect, MouseEvent } from 'react';
import { useRegisterComponent } from './useEventBusEvent';

type ButtonProps = ComponentProps<'button'> & {
  tracking: {
    eventName: string,
  }
};

export const ButtonIdentity = Symbol('Button');

export type ButtonCustomEvent = {
  identity: typeof ButtonIdentity,
  name: 'Button'
  type: 'mount' | 'unmount' | 'onClick',
};

export const Button = (props: ButtonProps) => {
  const stage = useEventBus<ButtonCustomEvent>(ButtonIdentity);

  useRegisterComponent<ButtonCustomEvent>(ButtonIdentity, 'Button');

  const { onClick: onClickFromParams, ...rest } = props;

  const onClick = (e: any) => {
    stage.emit('onClick', { detail: { eventAction: 'button_click', ...props.tracking } })

    onClickFromParams?.(e);
  }

  return (
    <button {...rest} onClick={onClick}>Label</button>
  )
}