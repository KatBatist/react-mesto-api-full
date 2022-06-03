import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

function Register({onRegistration}) {

  const [data, setData] = useState({
    email: "",
    password: ""
  });
    
  const addText = (
    <div className="form__message">Уже зарегистрированы? 
      <Link className="form__link" to="/sign-in"> Войти</Link>
    </div> )
  
  const handleChange = (e) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegistration(data);
  };
    
  return (
    <Form 
      title="Регистрация" buttonText="Зарегистрироваться" 
      onSubmit={handleSubmit}
      addText={addText}
    >
      <input
        className="form__input form__input_simple"
        type="email"
        id="login-email"
        placeholder="Email"
        name="email"
        maxLength="30"
        value={data.email || ''}
        onChange={handleChange}
        required
      />
      <input
        className="form__input form__input_simple"
        type="password"
        id="login-password"
        placeholder="Пароль"
        name="password"
        value={data.password || ''}
        onChange={handleChange}
        required
      />  
    </Form>
  );
}
 
export default Register;
