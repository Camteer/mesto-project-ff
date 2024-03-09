import {
  addCard,
  handleDeleteCard,
  handleLikeCard,
  handleImageClick,
} from "../scripts/cards.js";

// Контейнер карточек

const cardsContainer = document.querySelector(".places__list");

// Формы

const formEdit = document.forms["edit-profile"];
const formCard = document.forms["new-place"];

// Эдиты

const nameInput = document.querySelector(".profile__title");
const jobInput = document.querySelector(".profile__description");

// Функции открытия окна

function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscape);
}

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscape);
}

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector(".popup_is-opened");
    closePopup(popupOpened);
  }
}

// Функция возврата формы

function handleFormSubmit(evt) {
  evt.preventDefault();
  nameInput.textContent = formEdit.name.value;
  jobInput.textContent = formEdit.description.value;
  formEdit.name.value = nameInput.textContent;
  formEdit.description.value = jobInput.textContent;
  closePopup(evt.target.closest(".popup"));
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
      console.log("Ошибка");
    });
}

// Функция возврата карты

function handleFormCard(evt) {
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
      console.log("Ошибка");
    });

  closePopup(evt.target.closest(".popup"));
  formCard.reset();
}

// Функция закрытия

function closeModal() {
  const popups = document.querySelectorAll(".popup");
  popups.forEach((popup) => {
    popup.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("popup_is-opened")) {
        closePopup(popup);
      }
      if (evt.target.classList.contains("popup__close")) {
        closePopup(popup);
      }
    });
  });
}

export {
  handleFormSubmit,
  handleFormCard,
  openPopup,
  closeModal,
  initCards,
  formEdit,
  formCard,
  nameInput,
  jobInput,
  cardsContainer,
};