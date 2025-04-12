import { ReactNode } from 'react';
import './index.scss';
interface WaveProps {
  children: ReactNode;
}
export function Wave(props: WaveProps) {
  return (
    <div className="ripple-icon">
      <div className="circle1"></div>
      <div className="circle2"></div>
      <div className="circle3"></div>
      <div className="icon-box">{props.children}</div>
    </div>
  );
}
