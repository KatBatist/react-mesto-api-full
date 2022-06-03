import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({isOpen, onClose, onAddPlace}) {

  const [name, setName] = React.useState("")
  const [link, setLink] = React.useState("")

  React.useEffect(() => { 
    setName("");
    setLink("");
  },[isOpen]); 

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name,
      link
    });
  }

  return (
    <PopupWithForm 
      id="2" name="add" title="Новое место" buttonText="Создать" 
      isOpen={isOpen} 
      onClose={onClose} 
      onSubmit={handleSubmit}
    >
      <input 
        className="form__input form__input_popup" 
        type="text" 
        id="card-name" 
        placeholder="Название" 
        name="inputCardName" 
        minLength="2" 
        maxLength="30" 
        value={name}
        onChange={handleChangeName}
        required
      />  
      <span className="form__input-error" id="card-name-error"></span>
      <input 
        className="form__input form__input_popup form__input_second" 
        type="url" id="card-link" 
        placeholder="Ссылка на картинку" 
        name="inputCardLink" 
        value={link}
        onChange={handleChangeLink}
        required
      />
      <span className="form__input-error" id="card-link-error"></span>
    </PopupWithForm>  
  );
}
    
export default AddPlacePopup;    