import { useEventBus } from '@/packages/EventBus.hooks';
import { ComponentProps, useRef, useEffect, useState } from 'react';
import { keyboardEventBus } from './keyboard';
import { useRegisterComponent } from './useEventBusEvent';

type ButtonProps = ComponentProps<'button'> & {
  tracking: {
    eventName: string,
  }
};

export const Button = (props: ButtonProps) => {
  const [label, setLabel] = useState('label')
  const ref = useRef<HTMLButtonElement>(null);
  const stage = useEventBus();

  useRegisterComponent(ref);

  useEffect(() => {
    keyboardEventBus.on('Escape', () => {
      if (Object.is(document.activeElement, ref.current)) {
        setLabel(v => v.length < 10 ? v + '1' : 'label')
      }
    });
  }, [])

  const { onClick: onClickFromParams, ...rest } = props;

  const onClick = (e: any) => {
    stage.emit('onClick', { detail: { eventAction: 'button_click', ...props.tracking } })

    onClickFromParams?.(e);
  }

  return (
    <button {...rest} ref={ref} onClick={onClick}>{label}</button>
  )
}