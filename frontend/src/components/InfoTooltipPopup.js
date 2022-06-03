import React from 'react';
import Popup from './Popup';

import SignupYes from '../images/signup-yes.svg';
import SignupNo from '../images/signup-no.svg';

function  InfoTooltipPopup ({isOpen, onClose, isSignup}) {
  
  return (
    <Popup 
      name="message"  
      isOpen={isOpen} 
      onClose={onClose}
    >
      <img src={isSignup ? SignupYes : SignupNo} className="popup__image" alt="иконка" />
      <h3 className="popup__message">
        {isSignup 
          ? 'Вы успешно зарегистрировались!'
          : 'Что-то пошло не так! Пропробуйте ещё раз.'}
      </h3>
    </Popup>    
  )
}

export default InfoTooltipPopup;
