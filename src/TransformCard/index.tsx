import React from 'react';
import './index.scss';
interface FlipHoverCardProps extends React.HTMLAttributes<HTMLDivElement> {
  front?: React.ReactNode;
  back?: React.ReactNode;
}
export const TransformCard = ({ className = '', front, back, ...props }: FlipHoverCardProps) => {
  return (
    <div className={`rs-transform-card ${className}`} {...props}>
      <div className="rs-transform-card-front">{front}</div>
      <div className="rs-transform-card-back">{back}</div>
    </div>
  );
};
