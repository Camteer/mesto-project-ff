// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import "../pages/index.css";

import {
  initialCards
} from "./cards.js";

import {
  handleFormSubmit,
  handleFormCard,
  openModal,
  closeModal,
  initCards
} from "../components/modal.js";

const avatar = new URL("../images/avatar.jpg", import.meta.url);
const logo = new URL("../images/logo.svg", import.meta.url);

// Контейнер карточек

const cardsContainer = document.querySelector(".places__list");

// Кнопки 

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const cardSection = document.querySelector(".places");

// Формы

const formEdit = document.forms["edit-profile"];
const formCard = document.forms["new-place"];

// Эдиты

const nameInput = document.querySelector(".profile__title");
const jobInput = document.querySelector(".profile__description");

// Попапы

const popupEdit = document.querySelector(".popup_type_edit");
const popupAddCard = document.querySelector(".popup_type_new-card");
const popupCard = document.querySelector(".popup_type_image");

// Инициализация

(function () {
  document.querySelector('.profile__image').setAttribute('style', `background-image: url(${avatar})`);
  document.querySelector('.logo').setAttribute('src', logo);
  popupEdit.classList.add("popup_is-animated");
  popupAddCard.classList.add("popup_is-animated");
  popupCard.classList.add("popup_is-animated");
  initialCards.forEach(initCards);
})();

// Cлушатели

formEdit.addEventListener("submit", handleFormSubmit);
formCard.addEventListener("submit", handleFormCard);
editButton.addEventListener("click", openModal);
addButton.addEventListener("click", openModal);
cardSection.addEventListener("click", openModal);
document.addEventListener("keydown", closeModal);

export {
  formEdit,
  formCard,
  nameInput,
  jobInput,
  popupEdit,
  popupAddCard,
  popupCard,
  cardsContainer,
};
