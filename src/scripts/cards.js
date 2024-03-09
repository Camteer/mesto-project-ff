import { openPopup } from "../components/modal.js";
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const popupCard = document.querySelector(".popup_type_image");

function handleDeleteCard(element) {
  element.target.parentElement.remove();
}

function handleImageClick(evt) {
  popupCard.querySelector(".popup__image").setAttribute("src", evt.target.src);
  popupCard.querySelector(".popup__caption").textContent = evt.target
    .closest(".card")
    .querySelector(".card__title").textContent;
  openPopup(popupCard);
}

function handleLikeCard(element) {
  element.target.classList.toggle("card__like-button_is-active");
}

function addCard(data, onDelete, onLike, onImage) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardElementImage = cardElement.querySelector(".card__image");
  const cardElementTitle = cardElement.querySelector(".card__title");
  const cardElementDelete = cardElement.querySelector(".card__delete-button");
  const cardElementLike = cardElement.querySelector(".card__like-button");
  cardElementImage.setAttribute("src", data.link);
  cardElementImage.setAttribute("alt", `Картинка местности ${data.name}`);
  cardElementTitle.textContent = data.name;
  cardElementDelete.addEventListener("click", onDelete);
  cardElementLike.addEventListener("click", onLike);
  cardElementImage.addEventListener("click", onImage);
  return cardElement;
}

export {
  initialCards,
  addCard,
  handleDeleteCard,
  handleLikeCard,
  handleImageClick,
  popupCard,
};
