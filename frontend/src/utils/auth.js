class Auth {
  constructor (options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }
  
  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }
  
  registration(data) {
    return fetch(`${this._baseUrl}/signup`, { method: 'POST', headers: this._headers,
      body: JSON.stringify({
        password: data.password,
        email: data.email})})
    .then(this._checkResponse);
  }
  
  authorization(data) {
    return fetch(`${this._baseUrl}/signin`, { method: 'POST', headers: this._headers,
      body: JSON.stringify({
        password: data.password,
        email: data.email})})
    .then(this._checkResponse);
  }
  
  checkToken(token) {
    return fetch(`${this._baseUrl}/users/me`, { method: 'GET', headers: {
      ...this._headers,
      Authorization: `Bearer ${token}`}})
    .then(this._checkResponse)
    }
  }
  
  export const auth = new Auth({
    baseUrl: 'https://api.domainbatist.students.nomoredomains.xyz',
    headers: {
      'Content-Type': 'application/json'
    }
}); 
