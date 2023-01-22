import { stage, StageManagerEvent } from '@/packages/eventbus';
import { ComponentProps, useEffect } from 'react';
import { useRegisterComponent } from './useStageEvent';

type ButtonProps = ComponentProps<'button'>;

export type ButtonCustomEvent = {
  name: 'Button'
  type: 'mountButton' | 'unmountButton',
};

export const Button = (props: ButtonProps) => {
  useRegisterComponent<ButtonCustomEvent>('Button');

  return (
    <button {...props}>Label</button>
  )
}