import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext} from '../contexts/CurrentUserContext';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
  const refAvatar = React.useRef();

  const currentUser = React.useContext(CurrentUserContext);

  function handleSubmit(e) {
    e.preventDefault(); 
    onUpdateAvatar({
      avatar: refAvatar.current.value
    });
  } 

  return (
    <PopupWithForm 
      id="3" name="avatar-edit" title="Обновить аватар" buttonText="Сохранить" 
      isOpen={isOpen} 
      onClose={onClose} 
      onSubmit={handleSubmit}
    >
      <input 
        className="form__input form__input_popup" 
        type="url" 
        id="profile-avatar-edit" 
        placeholder="Ссылка на аватар" 
        name="inputAvatar" 
        ref={refAvatar}
        defaultValue={currentUser.avatar} 
        required
      />  
      <span className="form__input-error" id="profile-avatar-edit-error"></span>
    </PopupWithForm>   
  );
}
    
export default EditAvatarPopup;    