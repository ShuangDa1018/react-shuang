import React from 'react';
import './index.scss';

interface HoverGalleryProps {
  images: string[];
  className?: string;
}

export const HoverGallery: React.FC<HoverGalleryProps> = ({ images, className = '' }) => {
  return (
    <div className={`hover-gallery ${className}`}>
      {images.map((image) => (
        <div key={image} className="hover-gallery-item">
          <img src={image} alt={image} className="hover-gallery-image" />
        </div>
      ))}
    </div>
  );
};
