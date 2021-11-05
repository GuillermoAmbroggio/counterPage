import React from 'react';
import useColorsCounter from '../../hooks/useColorsCounter';
import Button, { IButton } from '../button/Button';
import './counter.css';

interface ICounter extends IButton {
  counter: number;
  disabled?: boolean;
}

const Counter: React.FC<ICounter> = ({ counter, disabled, ...rest }) => {
  const styleCounter: {
    opacity?: number;
    backgroundColor?: string;
    color?: string;
  } = {};

  const colorCounter = useColorsCounter(counter);
  styleCounter.backgroundColor = colorCounter;

  if (disabled) {
    styleCounter.opacity = 0.7;
    styleCounter.backgroundColor = 'white';
    styleCounter.color = 'black';
  }
  return (
    <Button
      style={styleCounter}
      title={counter}
      disabled={disabled}
      className="counter-style"
      {...rest}
    />
  );
};

export default Counter;
