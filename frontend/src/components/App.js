import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import Login from './Login';
import Register from './Register';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import CardDeletePopup from './CardDeletePopup';
import InfoTooltipPopup from './InfoTooltipPopup';
import {api} from '../utils/api.js'
import {auth} from '../utils/auth.js';
import { CurrentUserContext} from '../contexts/CurrentUserContext';
import { Route, Switch, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  const [isCardDeletePopupOpen, setIsCardDeletePopupOpen] = React.useState(false)
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({})
  const [cards, setCards] = React.useState([])
  const [currentCard, setCurrentCard] = React.useState({})
  const [currentUser, setCurrentUser] = React.useState({});

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentEmail, setCurrentEmail] = React.useState(null);
  const [isSignup, setIsSignup] = React.useState(false);
  const history = useHistory();

  const [inputEmail, setInputEmail] = React.useState(null);

  const [token, setToken] = React.useState('');

  // const [isLoadingSetUserInfo, setIsLoadingSetUserInfo] = React.useState(false); // *
  // const [isLoadingAvatarUpdate, setIsLoadingAvatarUpdate] = React.useState(false); // *
  // const [isLoadingInitialData, setIsLoadingInitialData] = React.useState(false); // *
  // const [isLoadingAddPlaceSubmit, setIsLoadingAddPlaceSubmit] = React.useState(false); // *

  React.useEffect(() => {
    if (loggedIn) { // *
      // setIsLoadingInitialData(true); // *

      const token = localStorage.getItem('jwt'); // *

      Promise.all([api.getUserInfo(token), api.getInitialCards(token)])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        // setIsLoadingInitialData(false); // *
      })
    }
  }, [loggedIn]);

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsCardDeletePopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({});
    setCurrentCard({});
  }
  
  function handleUpdateUser(user) {
    // setIsLoadingSetUserInfo(true); // *
    api.setProfileInfo(user.name, user.about, token)
    .then((userData) => {
      setCurrentUser(userData)
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      // setIsLoadingSetUserInfo(false) // *
    });
  }

  function handleUpdateAvatar(user, evt) {
    // setIsLoadingAvatarUpdate(true); // *
    api.setAvatar(user.avatar, token)
    .then((userData) => {
      setCurrentUser(userData)
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      // setIsLoadingAvatarUpdate(false); // *
    })
  }

  function handleAddPlaceSubmit(place) {
    // setIsLoadingAddPlaceSubmit(true); // *
    api.setAddCard(place.name, place.link, token)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      // setIsLoadingAddPlaceSubmit(false);
    })
  }

  

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.setLike(card._id, !isLiked, token)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {
      console.log(err);
    }); 
  }
  
  function handleCardDelete(evt) {
    evt.preventDefault(); // *
    api.setDeleteCard(currentCard._id, token)
    .then(() => {
      setCards((state) => state.filter((c) => c._id !== currentCard._id));
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    }); 
  }

  function handleCardDeleteClick(card) {
    setCurrentCard(card);
    setIsCardDeletePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() { 
    setIsAddPlacePopupOpen(true);
  };

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }
  
  function handleInfoTooltipPopupOpen() {
    setIsInfoTooltipPopupOpen(true);
  }

  function handleSingout() {
    setLoggedIn(false);
    setInputEmail(null);
    localStorage.removeItem('jwt');
    history.push('/sign-in');
  }
  
  function handleRegistration(data) {
    auth.registration(data)
    .then((data) => {
      setIsSignup(true);
      setInputEmail(data.data.email);
      history.push('/sign-in')
    })
    .catch((err) => {
      console.log(err);
      setIsSignup(false);
    })
    .finally(() => {
      handleInfoTooltipPopupOpen();
    })  
  }
  
  function handleAuthorization(data) {
    auth.authorization(data)
    .then((data) => {
      setLoggedIn(true);
      localStorage.setItem('jwt', data.token);
      setToken(data.token); // *
      handleCheckToken();
      history.push('/');
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const handleCheckToken = React.useCallback(() => {
    const token = localStorage.getItem('jwt');
    auth.checkToken(token)
    .then((data) => {
      setCurrentEmail(data.data.email);
      setLoggedIn(true);
      history.push('/');
    })
    .catch((err) => {
      console.log(err);
    })
  }, [history])

  React.useEffect(() => {
    const token = localStorage.getItem('jwt');

    if (token) {
      handleCheckToken();
    }
  }, [handleCheckToken])

  return (
    <div className="root">
      <CurrentUserContext.Provider value={currentUser}>
        <Header 
          loggedIn={loggedIn}
          currentEmail={currentEmail}
          onSingout={handleSingout}
        />
        <Switch>
          <Route path="/sign-up">
            <Register onRegistration={handleRegistration}/>
          </Route>
          <Route path="/sign-in">
            <Login 
              onAuthorization={handleAuthorization}
              inputEmail={inputEmail}/>
          </Route>
          <ProtectedRoute
            path="/"
            component={Main}
            onEditProfile={handleEditProfileClick} 
            onAddPlace={handleAddPlaceClick} 
            onEditAvatar={handleEditAvatarClick} 
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDeleteClick}
            loggedIn={loggedIn}
            // isLoadingInitialData={isLoadingInitialData}
          />
        </Switch>  
        <Footer />
        <ImagePopup 
          isOpen={isImagePopupOpen} 
          onClose={closeAllPopups}
          card={selectedCard} 
        />
        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups} 
          onUpdateUser={handleUpdateUser}
          // currentUser={currentUser}
          // isLoadingData={isLoadingSetUserInfo}
          // isLoadingInitialData={isLoadingInitialData}
        />  
        <AddPlacePopup 
          isOpen={isAddPlacePopupOpen} 
          onClose={closeAllPopups} 
          onAddPlace={handleAddPlaceSubmit}
          // isLoadingData={isLoadingAddPlaceSubmit}
        />  
        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups} 
          onUpdateAvatar={handleUpdateAvatar}
          // isLoadingData={isLoadingAvatarUpdate}
        />  
        <CardDeletePopup 
          isOpen={isCardDeletePopupOpen} 
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
        />
        <InfoTooltipPopup
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          isSignup={isSignup}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
