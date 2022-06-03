import React from 'react';

function Form({title, buttonText, onSubmit, children, addText}) {
  
  return (
    <form 
      className="form form_simple" 
      onSubmit={onSubmit}
    >
      <h2 className="form__header ">{title}</h2>
      {children}
      <button 
        className="form__submit form__submit_simple" 
        type="submit">
        {buttonText}
      </button> 
      {addText}
    </form>
  );
}
 
export default Form;