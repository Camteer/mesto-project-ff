function search(method, entity, objAtt, id = "") {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-10/${entity}/${id}`, {
    method,
    headers: {
      authorization: "2861e698-c93e-4af8-bc74-4f3b70e5bd6e",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(objAtt),
  });
}

function catchErr(err, res) {
  return new Promise(function (resolve, reject) {
    console.log("Запрос отклонён", err);
    reject(res);
  });
}

function getInfo() {
  return search("GET", "users/me").then((res) => {
    if (res.ok) {
      return res.json();
    }
    return catchErr(res.status, res.ok);
  });
}

function saveAvatar(avatar) {
  return search("PATCH", "users/me/avatar", { avatar }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return catchErr(res.status, res.ok);
  });
}

function saveInfo(name, about) {
  return search("PATCH", "users/me", { name, about }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return catchErr(res.status, res.ok);
  });
}

function setCard(name, link) {
  return search("POST", "cards", { name, link }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return catchErr(res.status, res.ok);
  });
}

function deleteCard(cardId = "") {
  return search("DELETE", "cards", {}, cardId).then((res) => {
    if (res.ok) {
      return true;
    }
    return catchErr(res.status, res.ok);
  });
}

function putLike(id, method) {
  return search(method, "cards/likes", {}, id).then((res) => {
    if (res.ok) {
      return true;
    }
    return catchErr(res.status, res.ok);
  });
}

function getCards() {
  return search("GET", "cards").then((res) => {
    if (res.ok) {
      return res.json();
    }
    return catchErr(res.status, res.ok);
  });
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
