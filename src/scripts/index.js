// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import "../pages/index.css";

import {
  initialCards,
  addCard,
  handleDeleteCard,
  handleLikeCard,
} from "./cards.js";

import {
  openPopup,
  closePopup,
  setCloseHandlers,
} from "../components/modal.js";

const avatar = new URL("../images/avatar.jpg", import.meta.url);
const logo = new URL("../images/logo.svg", import.meta.url);

// Контейнер карточек

const cardsContainer = document.querySelector(".places__list");

// Формы

const formEdit = document.forms["edit-profile"];
const formCard = document.forms["new-place"];

// Эдиты

const nameInput = document.querySelector(".profile__title");
const jobInput = document.querySelector(".profile__description");

// Кнопки

const editButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

// Попапы

const profileForm = document.querySelector(".popup_type_edit");
const popupAddCard = document.querySelector(".popup_type_new-card");
const popupCard = document.querySelector(".popup_type_image");
const popupCardImage = popupCard.querySelector(".popup__image");
const popupCardTextContent = popupCard.querySelector(".popup__caption");

// Функция возврата формы

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  nameInput.textContent = formEdit.name.value;
  jobInput.textContent = formEdit.description.value;
  closePopup(evt.target.closest(".popup"));
}

//

function handleImageClick(data) {
  popupCardImage.setAttribute("src", data.link);
  popupCardImage.setAttribute("alt", `Картинка местности ${data.name}`);
  popupCardTextContent.textContent = data.name;
  openPopup(popupCard);
}

// Функция проверки ссылки

function getImage(url) {
  return new Promise(function (resolve, reject) {
    const img = new Image();
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
      cardsContainer.append(
        addCard(element, handleDeleteCard, handleLikeCard, handleImageClick)
      );
    })
    .catch(() => {
      console.log("Ошибка ссылки");
    });
}

// Функция возврата карты

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const name = formCard["place-name"].value;
  const link = formCard["link"].value;
  const data = {
    name,
    link,
  };
  getImage(data.link)
    .then(() => {
      cardsContainer.prepend(
        addCard(data, handleDeleteCard, handleLikeCard, handleImageClick)
      );
    })
    .catch(() => {
      console.log("Ошибка ссылки");
    });

  closePopup(evt.target.closest(".popup"));
  formCard.reset();
}

// Инициализация

(function () {
  document
    .querySelector(".profile__image")
    .setAttribute("style", `background-image: url(${avatar})`);
  document.querySelector(".logo").setAttribute("src", logo);
  initialCards.forEach(initCards);
})();

// Cлушатели

formEdit.addEventListener("submit", handleProfileFormSubmit);
formCard.addEventListener("submit", handleCardFormSubmit);
editButton.addEventListener("click", () => {
  formEdit.name.value = nameInput.textContent;
  formEdit.description.value = jobInput.textContent;
  openPopup(profileForm);
});
addCardButton.addEventListener("click", () => openPopup(popupAddCard));
setCloseHandlers();
