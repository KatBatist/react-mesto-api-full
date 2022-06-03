import React, { useState } from 'react';
import Form from './Form';

function Login({ onAuthorization, inputEmail} ) {

  const [data, setData] = useState({
    email: inputEmail,
    password: ""
  });
    
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setData({
      ...data,
      [name]: value,
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onAuthorization(data);
  };

  return(
    <Form 
      title="Вход" buttonText="Войти" 
      onSubmit={handleSubmit}
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
  )
}

export default Login;
