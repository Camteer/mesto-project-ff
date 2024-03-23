function makeRequest(method, entity, objAtt, id = "") {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-10/${entity}/${id}`, {
    method,
    headers: {
      authorization: "2861e698-c93e-4af8-bc74-4f3b70e5bd6e",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(objAtt),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

function getInfo() {
  return makeRequest("GET", "users/me");
}

function saveAvatar(avatar) {
  return makeRequest("PATCH", "users/me/avatar", { avatar });
}

function saveInfo(name, about) {
  return makeRequest("PATCH", "users/me", { name, about });
}

function setCard(name, link) {
  return makeRequest("POST", "cards", { name, link });
}

function deleteCard(cardId = "") {
  return makeRequest("DELETE", "cards", {}, cardId);
}

function putLike(id, method) {
  return makeRequest(method, "cards/likes", {}, id);
}

function getCards() {
  return makeRequest("GET", "cards");
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
