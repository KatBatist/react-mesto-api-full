import React from 'react';
import Popup from './Popup';

function PopupWithForm({name, title, buttonText, isOpen, onClose, onSubmit, children}) {
  return (
    <Popup 
      name={name}  
      isOpen={isOpen} 
      onClose={onClose}
    >
      <h2 className="popup__header">{title}</h2>
      <form 
        className={`form form-${name}`} 
        name={`form-${name}`} 
        onSubmit={onSubmit}
      >
        {children}
        <button 
          className="form__submit form__submit_popup" 
          type="submit">
          {buttonText}
        </button>
      </form>
    </Popup>
  );
}

export default PopupWithForm;      
