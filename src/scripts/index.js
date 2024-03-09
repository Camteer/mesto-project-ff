// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import "../pages/index.css";

import { initialCards, popupCard } from "./cards.js";

import {
  formEdit,
  formCard,
  nameInput,
  jobInput,
  handleFormSubmit,
  handleFormCard,
  openPopup,
  closeModal,
  initCards,
} from "../components/modal.js";

const avatar = new URL("../images/avatar.jpg", import.meta.url);
const logo = new URL("../images/logo.svg", import.meta.url);

// Кнопки

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

// Попапы

const popupEdit = document.querySelector(".popup_type_edit");
const popupAddCard = document.querySelector(".popup_type_new-card");

// Инициализация

(function () {
  document
    .querySelector(".profile__image")
    .setAttribute("style", `background-image: url(${avatar})`);
  document.querySelector(".logo").setAttribute("src", logo);
  popupEdit.classList.add("popup_is-animated");
  popupAddCard.classList.add("popup_is-animated");
  popupCard.classList.add("popup_is-animated");
  initialCards.forEach(initCards);
  formEdit.name.value = nameInput.textContent;
  formEdit.description.value = jobInput.textContent;
})();

// Cлушатели

formEdit.addEventListener("submit", handleFormSubmit);
formCard.addEventListener("submit", handleFormCard);
editButton.addEventListener("click", () => openPopup(popupEdit));
addButton.addEventListener("click", () => openPopup(popupAddCard));
popupEdit.addEventListener("click", closeModal);
popupAddCard.addEventListener("click", closeModal);
popupCard.addEventListener("click", closeModal);
