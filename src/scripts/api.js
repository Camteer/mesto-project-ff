import { addCard } from "./card";

const cardsContainer = document.querySelector(".places__list");

function search (method, entity, objAtt, id='') {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-10/${entity}/${id}`, 
   {
    method,
    headers: {
      authorization: "2861e698-c93e-4af8-bc74-4f3b70e5bd6e",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(objAtt)
  }
  )
}

const og = {
  user: 'users/me', 
  cards: 'cards',
  likes: 'cards/likes',
  avatar: '/users/me/avatar', 
}

function getInfo() {
  return search("GET", 'users/me')
    .then((res) => {
      return res.json();
    })
}

function saveAvatar(avatar) {
  return search("PATCH", 'users/me/avatar', {avatar})
}

function saveInfo(name, about) {
  return search("PATCH", 'users/me', {name, about})
}

function setCard(name, link) {
  return search('POST', 'cards', {name, link})
}

function deleteCard(cardId = "") {
  return search("DELETE", 'cards', {}, cardId)
}

function putLike(id, method) {
  return search(method, 'cards/likes', {}, id)
}

function getCards() {
  return search("GET", 'cards')
    .then((res) => {
      return res.json();
    })
}

export {
  getInfo,
  getCards,
  saveAvatar,
  saveInfo,
  setCard,
  deleteCard,
  putLike,
};



