import React from 'react';
import { useFullscreen } from '../../hooks/useFullscreen';

export const FullscreenButton = ({ children, className = '', onClick }) => {
  const { isFullscreen, toggleFullscreen } = useFullscreen();

  const handleClick = (e) => {
    toggleFullscreen();
    if (onClick) onClick(e);
  };

  return (
    <button
      onClick={handleClick}
      className={`${className} relative group inline-flex items-center gap-2`}
    >
      {children}
      <span className="inline-flex items-center ml-1">
        {isFullscreen ? '⤓' : '⤢'}
      </span>
    </button>
  );
};