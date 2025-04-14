import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import './index.scss';

interface GradientHoverProps {
  className?: string;
  style?: CSSProperties;
  contentClass?: string;
  gradientSize?: number;
  gradientColor?: string;
  gradientOpacity?: number;
  children: React.ReactNode;
}

export const CardSpotlight: React.FC<GradientHoverProps> = ({
  className = '',
  style = {},
  contentClass = '',
  gradientSize = 200,
  gradientColor = '#363636',
  gradientOpacity = 0.8,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: -gradientSize * 10, y: -gradientSize * 10 });

  useEffect(() => {
    setCoords({ x: -gradientSize * 10, y: -gradientSize * 10 });
  }, [gradientSize]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setCoords({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseLeave = () => {
    setCoords({ x: -gradientSize * 10, y: -gradientSize * 10 });
  };

  const background = `radial-gradient(circle at ${coords.x}px ${coords.y}px, ${gradientColor} 0%, rgba(0, 0, 0, 0) 70%)`;

  return (
    <div className={`gradient-hover-container ${className}`} style={style} ref={containerRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <div className={`content ${contentClass}`}>{children}</div>
      <div
        className="gradient-overlay"
        style={{
          background,
          opacity: gradientOpacity,
        }}
      />
    </div>
  );
};
