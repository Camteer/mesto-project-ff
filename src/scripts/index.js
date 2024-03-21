// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import "../pages/index.css";

import { handleDeleteCard, handleLikeCard, addCard } from "./cards.js";

import {
  openPopup,
  closePopup,
  setCloseHandlers,
} from "../components/modal.js";

import { enableValidation, clearValidation } from "../components/validation.js";

import {
  takeInfo,
  saveInfo,
  setCard,
  saveAvatar,
  myId,
  cardFromSercer,
} from "./api.js";

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

function safelyLoad(array, flag = false) {
  return Promise.all(array).then((res) => {
    const data = res[0];
    const id = res[1];
    if (!flag) {
      data.forEach((element) => {
        getImage(element.link)
          .then(() => {
            cardsContainer.append(
              addCard(
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
      getImage(res[0][0].link)
        .then(() => {
          cardsContainer.prepend(
            addCard(
              res[0][0],
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
  nameInput.textContent = formEdit.name.value;
  jobInput.textContent = formEdit.description.value;
  const load = evt.target.querySelector(".popup__button");
  load.textContent = "Сохранение...";
  saveInfo(nameInput.textContent, jobInput.textContent).then((res) => {
    if (res.ok) {
      load.textContent = "Сохранить";
    }
  });
  clearValidation(evt.target);
  closePopup(evt.target.closest(".popup"));
}

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
  avatarButton.setAttribute("style", `background-image: url(${link})`);
  const load = evt.target.querySelector(".popup__button");
  load.textContent = "Сохранение...";
  saveAvatar(link).then((res) => {
    if (res.ok) {
      load.textContent = "Сохранить";
    }
  });
  clearValidation(evt.target);
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
  setCard(data.name, data.link).then((res) => {
    if (res.ok) {
      safelyLoad([cardFromSercer(), myId()], true);
      closePopup(evt.target.closest(".popup"));
      load.textContent = "Сохранить";
    }
  });
  clearValidation(evt.target);
}

// Инициализация

(function () {
  document.querySelector(".logo").setAttribute("src", logo);
  takeInfo(nameInput, jobInput, avatarButton);
  document.querySelector(".logo").setAttribute("src", logo);
  safelyLoad([cardFromSercer(), myId()]);
  enableValidation();
  setCloseHandlers();
})();

// Cлушатели

formEdit.addEventListener("submit", handleProfileFormSubmit);
formCard.addEventListener("submit", handleCardFormSubmit);
formAvatar.addEventListener("submit", handleAvatarSubmit);
editButton.addEventListener("click", () => {
  formEdit.name.value = nameInput.textContent;
  formEdit.description.value = jobInput.textContent;
  openPopup(profileForm);
});

avatarButton.addEventListener("click", () => {
  openPopup(popupAvatar);
});
addCardButton.addEventListener("click", () => openPopup(popupAddCard));
