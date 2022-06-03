import React from 'react';
import { useEffect } from "react";

function Popup({name, isOpen, onClose, isImage, children}) {
  useEffect(() => {
    if (!isOpen) return;
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('keydown', closeByEscape)
    return () => document.removeEventListener('keydown', closeByEscape)
  }, [isOpen, onClose])

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
        onClose();
    }
  }
 
  return (
    <div
      className= {isOpen ? `popup popup-${name} popup_opened` : `popup popup-${name}`}
      onClick={handleOverlay}
    >
      <div className={isImage ? 'popup-card__container' : 'popup__container'}>
        {children}
        <button
          className={`popup__close-btn popup-${name}-close`}
          type='button'
          onClick={onClose}
        />
      </div>
    </div>
  );
}

export default Popup;    

