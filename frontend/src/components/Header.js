import React from 'react';
import logo from '../images/header-logo.svg';
import { Link, useLocation } from 'react-router-dom';

function Header({ loggedIn, currentEmail, onSingout }) {
  const location = useLocation();

  const [isMenu, setIsMenu] = React.useState(false);

  function handleResize() {
    handleCloseMenu();
  }

  function handleSignout() {
    handleCloseMenu();
    onSingout();
  }

  function handleOpenMenu() {
    setIsMenu(true);
    window.addEventListener('resize', handleResize)
  }

  function handleCloseMenu() {
    setIsMenu(false);
    window.removeEventListener('resize', handleResize)
  }

  return (
    <header className="header">
      {!isMenu 
      ? (<div className="header__container">
          <img className="header__logo" src={logo} alt="логотип сайта" />
          {loggedIn 
          ? (<div className="header__menu">
              <div className="header__container-menu">
                <address className="header__address">{currentEmail && currentEmail}</address>
                <button className="header__signout-btn" type="button" onClick={handleSignout}>Выйти</button>
              </div>
              <button className="header__open-btn"type="button" onClick={handleOpenMenu}></button>
            </div>)
          : (location.pathname === '/sign-in' 
            ? (<Link className="header__link" to="/sign-up">Регистрация</Link>)
            : location.pathname === '/sign-up' &&
              (<Link className="header__link" to="/sign-in">Войти</Link>))}
        </div>)
      : (loggedIn &&
        <div className="header__column">
          <address className="header__address header__address_column">{currentEmail && currentEmail}</address>
          <button className="header__signout-btn header__signout-btn_column" type="button" onClick={handleSignout}>Выйти</button>
          <div className="header__container header__container_column">
            <img className="header__logo" src={logo} alt="логотип сайта" />
            <button className="header__close-btn"type="button" onClick={handleCloseMenu}></button>
          </div>
        </div>)}
  </header>
  )
}

export default Header;
