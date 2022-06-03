import React from 'react';
import Card from './Card';
import { CurrentUserContext} from '../contexts/CurrentUserContext';

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
    <section className="profile">
      <div className="profile__container-avatar">
        <img className="profile__avatar" alt="Аватар." src={currentUser.avatar}/>
        <button className="profile__avatar-btn"  onClick={onEditAvatar}></button>
      </div>
      <div className="profile__info">
        <h1 className="profile__name">{currentUser.name}</h1>
        <button className="profile__edit-btn" type="button" onClick={onEditProfile}></button>
        <p className="profile__job">{currentUser.about}</p>
      </div>
      <button className="profile__add-btn" type="button" onClick={onAddPlace}></button>
    </section>
    <section className="cards">
      <ul className="cards__container">
        {cards.map(res => (
          <Card 
            key={res._id} 
            card = {res} 
            onCardClick={onCardClick} 
            onCardLike={onCardLike} 
            onCardDelete={onCardDelete}
          />
        ))}
      </ul>
    </section>
    </>  
  );
}

export default Main;
