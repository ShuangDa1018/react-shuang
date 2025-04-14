import React, { ReactNode } from 'react';
import './index.scss';

type FlipDirection = 'x' | 'y';

interface FlipCardProps {
  rotate?: FlipDirection;
  className?: string;
  front: ReactNode;
  back: ReactNode;
}

export const FlipCard: React.FC<FlipCardProps> = ({ rotate = 'y', className = '', front, back }) => {
  return (
    <div className={`flip-card-container ${className}`}>
      <div className={`flip-card-inner rotate-${rotate}`}>
        <div className="flip-card-front">{front}</div>
        <div className="flip-card-back">{back}</div>
      </div>
    </div>
  );
};
