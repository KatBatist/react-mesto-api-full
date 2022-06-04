class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }
    
  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards(token) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET', 
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`
      },
    }).then(this._checkResponse);
  }

  setLike(cardId, isLike, token) {
    let method = 'DELETE';
    if (isLike)
      method = 'PUT';
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, { 
      method: method, 
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`
      },
    }).then(this._checkResponse);
  }
    
  getUserInfo(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET', 
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`
      },
    }).then(this._checkResponse);
  }
    
  setDeleteCard(cardId, token) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, { 
      method: 'DELETE', 
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`
      },
    }).then(this._checkResponse);
  }

  setAvatar(avatar, token) {
    return fetch(`${this._baseUrl}/users/me/avatar`, { 
      method: 'PATCH', 
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`
      },
      body: 
        JSON.stringify({
          avatar: avatar
        })
    }).then(this._checkResponse);
  }

  setProfileInfo(name, about, token) {
    return fetch(`${this._baseUrl}/users/me`, { 
      method: 'PATCH', 
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`
      },
      body: 
        JSON.stringify({
          name: name,
          about: about
        })
    }).then(this._checkResponse);
  }

  setAddCard(name, link, token) {
    return fetch(`${this._baseUrl}/cards`, { 
      method: 'POST', 
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name: name,
        link: link
      }),
    }).then(this._checkResponse);
  }
}
  
export const api = new Api({
  baseUrl: 'https://api.domainbatist.students.nomoredomains.xyz',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
}); 
 