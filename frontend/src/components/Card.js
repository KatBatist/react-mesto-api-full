import React from 'react';
import { CurrentUserContext} from '../contexts/CurrentUserContext';

function Card({card, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext);

  function handleClick() {
    onCardClick(card);
  }  

  function handleLike() {
    onCardLike(card);
  } 

  function handleDelete() {
    onCardDelete(card);
  } 

  return (
    <li className="card" >
      <img className="card__image" alt={card.name} src={card.link} onClick={handleClick}/>
      <button className={card.owner === currentUser._id 
        ? `card__delete-btn card__delete-btn_opened` 
        : `card__delete-btn`} onClick={handleDelete}></button>
      <div className="card__container">
        <p className="card__caption">{card.name}</p>
        <div className="card__like-group">
        <button className={card.likes.some(i => i === currentUser._id)
          ? `card__like-btn card__like-btn_active`
          : `card__like-btn`} onClick={handleLike}></button> 
          <span className="card__like-count">{card.likes.length}</span>
        </div>   
      </div>
    </li>
  );
}

export default Card;
