// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import "../pages/index.css";

import { handleDeleteCard, handleLikeCard, createCard } from "./card.js";

import {
  openPopup,
  closePopup,
  setCloseHandlers,
} from "../components/modal.js";

import { enableValidation, clearValidation } from "../components/validation.js";

import { saveInfo, setCard, saveAvatar, getCards, getInfo } from "./api.js";

const settingsValidation = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "form__submit_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

const logo = new URL("../images/logo.svg", import.meta.url);

// Контейнер карточек

const cardsContainer = document.querySelector(".places__list");

// Формы

const formEdit = document.forms["edit-profile"];
const formCard = document.forms["new-place"];
const formAvatar = document.forms["new-avatar"];

// Эдиты

const nameInput = document.querySelector(".profile__title");
const jobInput = document.querySelector(".profile__description");

// Кнопки

const avatarButton = document.querySelector(".profile__image");
const editButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

// Попапы

const popupAvatar = document.querySelector(".popup_type_new-avatar");
const profileForm = document.querySelector(".popup_type_edit");
const popupAddCard = document.querySelector(".popup_type_new-card");
const popupCard = document.querySelector(".popup_type_image");
const popupCardImage = popupCard.querySelector(".popup__image");
const popupCardTextContent = popupCard.querySelector(".popup__caption");

// Промисы

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

function safelyLoad(array) {
  return Promise.all(array).then((res) => {
    const data = res[0];
    const id = res[1]._id;
    if (Array.isArray(data)) {
      data.forEach((element) => {
        getImage(element.link)
          .then(() => {
            cardsContainer.append(
              createCard(
                element,
                handleDeleteCard,
                handleLikeCard,
                handleImageClick,
                id
              )
            );
          })
          .catch((err) => {
            console.log(err);
          });
      });
    } else {
      getImage(data.link)
          .then(() => {
            cardsContainer.prepend(
              createCard(
                data,
                handleDeleteCard,
                handleLikeCard,
                handleImageClick,
                id
              )
            );
          })
          .catch((err) => {
            console.log(err);
          });
    }
    
    
  });
}

// Функция возврата формы

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const load = evt.target.querySelector(".popup__button");
  load.textContent = "Сохранение...";
  saveInfo(formEdit.name.value, formEdit.description.value).then((res) => {
    if (res.ok) {
      load.textContent = "Сохранить";
      return res.json()
    }
  })
  .then((res) => {
    nameInput.textContent = res.name;
    jobInput.textContent = res.about
  });
  clearValidation(evt.target, settingsValidation);
  closePopup(evt.target.closest(".popup"));
}

getInfo().then((data) => {
  nameInput.textContent = data.name;
  jobInput.textContent = data.about;
  avatarButton.setAttribute("style", `background-image: url(${data.avatar})`);
});

//

function handleImageClick(data) {
  popupCardImage.setAttribute("src", data.link);
  popupCardImage.setAttribute("alt", `Картинка местности ${data.name}`);
  popupCardTextContent.textContent = data.name;
  openPopup(popupCard);
}

function handleAvatarSubmit(evt) {
  evt.preventDefault();
  const link = formAvatar["link"].value;
  const load = evt.target.querySelector(".popup__button");
  load.textContent = "Сохранение...";
  saveAvatar(link).then((res) => {
    if (res.ok) {
      load.textContent = "Сохранить";
      return res.json()
    }
  }).then((res) => {
    avatarButton.setAttribute("style", `background-image: url(${res.avatar})`);
  });
  clearValidation(evt.target, settingsValidation);
  closePopup(evt.target.closest(".popup"));
}

// Функция возврата карты

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const load = evt.target.querySelector(".popup__button");
  const name = formCard["place-name"].value;
  const link = formCard["link"].value;
  const data = {
    name,
    link,
  };
  load.textContent = "Сохранение...";
  setCard(data.name, data.link)
    .then((res) => {
      if (res.ok) {
        
        closePopup(evt.target.closest(".popup"));
        load.textContent = "Сохранить";
        return res.json()
      }
    })
    .then((card) => {
      safelyLoad([card, getInfo()]);
    });
  clearValidation(evt.target, settingsValidation);
}

// Инициализация

(function () {
  document.querySelector(".logo").setAttribute("src", logo);
  document.querySelector(".logo").setAttribute("src", logo);
  safelyLoad([getCards(), getInfo()]);
  enableValidation(settingsValidation);
  setCloseHandlers();
})();

// Cлушатели

formEdit.addEventListener("submit", handleProfileFormSubmit);
formCard.addEventListener("submit", handleCardFormSubmit);
formAvatar.addEventListener("submit", handleAvatarSubmit);
editButton.addEventListener("click", () => {
  clearValidation(profileForm, settingsValidation);
  formEdit.name.value = nameInput.textContent;
  formEdit.description.value = jobInput.textContent;
  openPopup(profileForm);
});

avatarButton.addEventListener("click", () => {
  formAvatar.reset();
  openPopup(popupAvatar);
  clearValidation(popupAvatar, settingsValidation);
});
addCardButton.addEventListener("click", () => {
  formCard.reset();
  openPopup(popupAddCard);
  clearValidation(popupAddCard, settingsValidation);
});
