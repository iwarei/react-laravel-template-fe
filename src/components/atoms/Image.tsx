import React from 'react';

type SquareImageProps = {
  id?: string;
  src: string;
  alt?: string;
  className?: string;
};

export const SquareImage = ({
  id = '',
  src,
  alt = '...',
  className = '',
}: SquareImageProps) => {
  return (
    <div>
      <img
        src={src}
        id={id}
        className={`object-cover w-full h-full ${className}`}
        style={{ aspectRatio: '1/1' }}
        alt={alt}
      />
    </div>
  );
};
