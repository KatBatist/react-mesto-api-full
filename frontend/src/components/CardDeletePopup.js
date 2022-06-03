import React from 'react';
import PopupWithForm from './PopupWithForm';

function CardDeletePopup({isOpen, onClose, onCardDelete}) {

  function handleSubmit(e) {
    e.preventDefault();
    onCardDelete();
  } 

  return (
    <PopupWithForm 
      id="4" name="delete" title="Вы уверены?" buttonText="Да"
      isOpen={isOpen} 
      onClose={onClose} 
      onSubmit={handleSubmit}
    />
  );
}

export default CardDeletePopup; 