import { deleteCard, putLike, statusLike } from "./api.js";

function handleDeleteCard(element, id) {
  element.target.closest(".card").remove();
  deleteCard(id);
}

function handleLikeCard(element, id, counter) {
  const likeButtom = element.target;
  console.log(likeButtom);
  if (likeButtom.classList.contains("card__like-button_is-active")) {
    putLike(id, "DELETE").then((res) => {
      if (res.ok) {
        statusLike(id, counter);
      }
    });
  } else {
    putLike(id, "PUT").then((res) => {
      if (res.ok) {
        statusLike(id, counter);
      }
    });
  }
  element.target.classList.toggle("card__like-button_is-active");
}

function addCard(data, onDelete, onLike, onImage, myId) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardElementImage = cardElement.querySelector(".card__image");
  const cardElementTitle = cardElement.querySelector(".card__title");
  const cardElementDelete = cardElement.querySelector(".card__delete-button");
  const counter = cardElement.querySelector(".like-count");
  const cardElementLike = cardElement.querySelector(".card__like-button");
  cardElementImage.setAttribute("src", data.link);
  cardElementImage.setAttribute("alt", `Картинка местности ${data.name}`);
  cardElementTitle.textContent = data.name;
  data.likes.forEach((element) => {
    if (element._id === myId) {
      cardElementLike.classList.add("card__like-button_is-active");
    }
  });
  counter.textContent = data.likes.length;
  cardElementDelete.addEventListener("click", (evt) => {
    onDelete(evt, data._id);
  });
  cardElementLike.addEventListener("click", (evt) => {
    onLike(evt, data._id, counter);
  });
  cardElementImage.addEventListener("click", () => onImage(data));
  if (data.owner._id !== myId) {
    cardElement.querySelector(".card__delete-button").remove();
  }

  return cardElement;
}

export { addCard, handleDeleteCard, handleLikeCard };
