import { addCard } from "./cards";

const cardsContainer = document.querySelector(".places__list");

function takeInfo(name, about, avatar) {
  fetch("https://nomoreparties.co/v1/wff-cohort-10/users/me", {
    method: "GET",
    headers: {
      authorization: "2861e698-c93e-4af8-bc74-4f3b70e5bd6e",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      name.textContent = result.name;
      about.textContent = result.about;
      avatar.setAttribute("style", `background-image: url(${result.avatar})`);
    })
    .catch((err) => {
      console.log("Ошибка. Запрос не выполнен");
    });
}

function saveAvatar(avatar) {
  return fetch("https://nomoreparties.co/v1/wff-cohort-10/users/me/avatar", {
    method: "PATCH",
    headers: {
      authorization: "2861e698-c93e-4af8-bc74-4f3b70e5bd6e",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar,
    }),
  });
}

function saveInfo(name, about) {
  return fetch("https://nomoreparties.co/v1/wff-cohort-10/users/me", {
    method: "PATCH",
    headers: {
      authorization: "2861e698-c93e-4af8-bc74-4f3b70e5bd6e",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      about,
    }),
  });
}

function setCard(name, link) {
  return fetch("https://nomoreparties.co/v1/wff-cohort-10/cards", {
    method: "POST",
    headers: {
      authorization: "2861e698-c93e-4af8-bc74-4f3b70e5bd6e",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      link,
    }),
  }).catch((err) => {
    console.log(err);
  });
}

function deleteCard(cardId = "") {
  fetch(`https://nomoreparties.co/v1/wff-cohort-10/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: "2861e698-c93e-4af8-bc74-4f3b70e5bd6e",
      "Content-Type": "application/json",
    },
  });
}

function putLike(id, method) {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-10/cards/likes/${id}`, {
    method,
    headers: {
      authorization: "2861e698-c93e-4af8-bc74-4f3b70e5bd6e",
      "Content-Type": "application/json",
    },
  }).catch((err) => {
    console.log(err);
  });
}

function statusLike(id, element) {
  return fetch("https://nomoreparties.co/v1/wff-cohort-10/cards", {
    method: "GET",
    headers: {
      authorization: "2861e698-c93e-4af8-bc74-4f3b70e5bd6e",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((results) => {
      results.forEach((result) => {
        if (id === result._id) {
          element.textContent = result.likes.length;
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

function myId() {
  return fetch("https://nomoreparties.co/v1/wff-cohort-10/users/me", {
    method: "GET",
    headers: {
      authorization: "2861e698-c93e-4af8-bc74-4f3b70e5bd6e",
    },
  })
    .then((myinfo) => {
      return myinfo.json();
    })
    .then((res) => {
      return res._id;
    });
}

function cardFromSercer() {
  return fetch("https://nomoreparties.co/v1/wff-cohort-10/cards", {
    method: "GET",
    headers: {
      authorization: "2861e698-c93e-4af8-bc74-4f3b70e5bd6e",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      return result;
    });
}

export {
  myId,
  cardFromSercer,
  takeInfo,
  saveAvatar,
  saveInfo,
  setCard,
  deleteCard,
  putLike,
  statusLike,
};
