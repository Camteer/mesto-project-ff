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
/* когда я делал проверку массив это или нет, то я не просто дублировал код, 
   а менял поведение добавления карточек в массив, 
   если загружал карточки с апи я использовал append,
   а при загрузки новой карточки, я использовал prepend, 
   о таком поведении говорилось в прошлом спринте.
   я сделал, как указали вы, но верно ли тогда просто добавлять в конец массива?
*/
function safetyLoad(array) {
  const data = array[0];
  const id = array[1];
  (Array.isArray(data) ? data : [data]).forEach((element) => {
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
}

let userId;
Promise.all([getCards(), getInfo()])
  .then(([cards, userInfo]) => {
    userId = userInfo._id;
    safetyLoad([cards, userId]);
    nameInput.textContent = userInfo.name;
    jobInput.textContent = userInfo.about;
    avatarButton.setAttribute(
      "style",
      `background-image: url(${userInfo.avatar})`
    );
  })
  .catch((err) => {
    console.log("Ошибка", err);
  });

// Функция возврата формы

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const load = evt.target.querySelector(".popup__button");
  load.textContent = "Сохранение...";
  saveInfo(formEdit.name.value, formEdit.description.value)
    .then((res) => {
      nameInput.textContent = res.name;
      jobInput.textContent = res.about;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      load.textContent = "Сохранить";
      closePopup(evt.target.closest(".popup"));
      clearValidation(evt.target, settingsValidation);
    });
}

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
  saveAvatar(link)
    .then((res) => {
      avatarButton.setAttribute(
        "style",
        `background-image: url(${res.avatar})`
      );
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      load.textContent = "Сохранить";
      clearValidation(evt.target, settingsValidation);
      closePopup(evt.target.closest(".popup"));
    });
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
    .then((card) => {
      safetyLoad([card, userId]);
    })
    .catch((err) => {
      console.log("Ошибка", err);
    })
    .finally(() => {
      load.textContent = "Сохранить";
      closePopup(evt.target.closest(".popup"));
      clearValidation(evt.target, settingsValidation);
    });
}

// Инициализация

(function () {
  document.querySelector(".logo").setAttribute("src", logo);
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
