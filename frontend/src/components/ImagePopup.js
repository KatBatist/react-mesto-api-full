import React from 'react';
import Popup from './Popup';

function ImagePopup({card, isOpen, onClose}) {

  return (
    <Popup 
      name="card"  
      isOpen={isOpen} 
      onClose={onClose}
      isImage="true"
    >
      <img className="popup-card__image" alt={card.name} src={card.link}/>
      <h3 className="popup-card__caption">{card.name}</h3>  
    </Popup>
  );
}

export default ImagePopup;
