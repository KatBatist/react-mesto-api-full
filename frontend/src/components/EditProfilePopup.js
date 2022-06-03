import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext} from '../contexts/CurrentUserContext';

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  const [name, setName] = React.useState("Жак Ив Кусто")
  const [description, setDescription] = React.useState("Исследователь океана")
  
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => { 
    setName(currentUser.name || "");
    setDescription(currentUser.about || "");
  },[currentUser, isOpen]); 

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  } 

  return (
    <PopupWithForm 
      id="1" name="edit" title="Редактировать профиль" buttonText="Сохранить" 
      isOpen={isOpen} 
      onClose={onClose} 
      onSubmit={handleSubmit}
    >
      <input 
        className="form__input form__input_popup" 
        type="text" 
        id="profile-name" 
        placeholder="Имя" 
        name="inputName" 
        minLength="2" 
        maxLength="40" 
        value={name}
        onChange={handleChangeName}
        required
      />  
      <span className="form__input-error" id="profile-name-error"></span>
      <input 
        className="form__input form__input_popup form__input_second" 
        type="text" 
        id="profile-job" 
        placeholder="Занятие" 
        name="inputJob" 
        minLength="2" 
        maxLength="200" 
        value={description}
        onChange={handleChangeDescription}
        required
      />
      <span className="form__input-error" id="profile-job-error"></span>
    </PopupWithForm>  
  );
}

export default EditProfilePopup;    