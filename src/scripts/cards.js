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

function handleDeleteCard(element) {
  element.target.parentElement.remove();
}

function handleLikeCard(element) {
  element.target.classList.toggle("card__like-button_is-active");
}

function addCard(data, onDelete, onLike) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);
  cardElement.querySelector(".card__image").setAttribute("src", data.link);
  cardElement.querySelector(".card__image").setAttribute("alt", `Картинка местности ${data.name}`);
  cardElement.querySelector(".card__title").textContent = data.name;
  cardElement.querySelector(".card__delete-button").addEventListener("click", onDelete);
  cardElement.querySelector(".card__like-button").addEventListener("click", onLike);
  return cardElement
}

export { 
  initialCards, 
  addCard, 
  handleDeleteCard, 
  handleLikeCard 
};
