import {
  formEdit,
  formCard,
  nameInput,
  jobInput,
  popupEdit,
  popupAddCard,
  popupCard,
  cardsContainer,
} from "../scripts/index.js";

import { addCard, handleDeleteCard, handleLikeCard } from "../scripts/cards.js";

// Функции открытия окна

function openModal(evt) {
  switch (evt.target.classList.value) {
    case "profile__edit-button":
      openEdit(popupEdit);
      break;
    case "profile__add-button":
      openAddCard(popupAddCard);
      break;
    case "card__image":
      openCard(evt, popupCard);
      break;
  }
}

function openEdit(divPopup) {
  divPopup.classList.add("popup_is-opened");
  formEdit.name.value = nameInput.textContent;
  formEdit.description.value = jobInput.textContent;
  divPopup.addEventListener("click", closeModal);
}

function openAddCard(divPopup) {
  divPopup.classList.add("popup_is-opened");
  divPopup.addEventListener("click", closeModal);
}

function openCard(evt, divPopup) {
  divPopup.classList.add("popup_is-opened");
  let image = document.querySelector(".popup__image");
  let caption = document.querySelector(".popup__caption");
  image.src = evt.target.src;
  caption.textContent =
    evt.target.parentElement.querySelector(".card__title").textContent;
  divPopup.addEventListener("click", closeModal);
}

// Функция возврата формы

function handleFormSubmit(evt) {
  evt.preventDefault();
  nameInput.textContent = formEdit.name.value;
  jobInput.textContent = formEdit.description.value;
  closeModal(evt);
}

// Функция проверки ссылки

function getImage(url) {
  return new Promise(function (resolve, reject) {
    let img = new Image();
    img.onload = function () {
      resolve(url);
    };
    img.onerror = function () {
      reject(url);
    };
    img.src = url;
  });
}

// Функция создание первых 6 карт

function initCards(element) {
  getImage(element.link)
    .then(() => {
      cardsContainer.append(addCard(element, handleDeleteCard, handleLikeCard));
    })
    .catch(() => {
      console.log("Ошибка");
    });
}

// Функция возврата карты

function handleFormCard(evt) {
  evt.preventDefault();
  let name = formCard["place-name"].value;
  let link = formCard["link"].value;
  const data = {
    name,
    link,
  };
  getImage(data.link)
    .then(() => {
      cardsContainer.prepend(addCard(data, handleDeleteCard, handleLikeCard));
    })
    .catch(() => {
      console.log("Ошибка");
    });

  closeModal(evt);
  formCard["place-name"].value = "";
  formCard["link"].value = "";
}

// Функция закрытия

function closeModal(evt) {
  let divPopup;

  switch (evt.type) {
    case "submit": // Закрытие по сабмит
      divPopup = evt.target.parentElement.parentElement;
      divPopup.classList.remove("popup_is-opened");
      divPopup.removeEventListener("click", closeModal);
      break;

    case "click": // Закрытие по оверлею  и крестику
      if (evt.target.classList.contains("popup")) {
        divPopup = evt.target;
        divPopup.classList.remove("popup_is-opened");
        divPopup.removeEventListener("click", closeModal);
        break;
      } else if (evt.target.classList.contains("popup__close")) {
        divPopup = evt.target.parentElement.parentElement;
        divPopup.classList.remove("popup_is-opened");
        divPopup.removeEventListener("click", closeModal);
        break;
      }
  }

  if (evt.key === "Escape") {
    try {
      const popupOpened = document.querySelector(".popup_is-opened");
      popupOpened.classList.remove("popup_is-opened");
      popupOpened.removeEventListener("click", closeModal);
    } catch {}
  }
}

export { handleFormSubmit, handleFormCard, openModal, closeModal, initCards };
