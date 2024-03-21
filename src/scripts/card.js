import { deleteCard, putLike } from "./api.js";

function handleDeleteCard(element, id) {
  deleteCard(id)
    .then((res) => {
      if (res) {
        element.target.closest(".card").remove();
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleLikeCard(element, id, counter) {
  const likeButtom = element.target;
  const likeMethod = likeButtom.classList.contains(
    "card__like-button_is-active"
  )
    ? "DELETE"
    : "PUT";

  putLike(id, likeMethod)
    .then((res) => {
      counter.textContent = res.likes.length;
      element.target.classList.toggle("card__like-button_is-active");
    })
    .catch((err) => {
      console.log(err);
    });
}

function createCard(data, onDelete, onLike, onImage, myId) {
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
  if (data.likes.some((element) => element._id === myId)) {
    cardElementLike.classList.add("card__like-button_is-active");
  }
  counter.textContent = data.likes.length;
  cardElementLike.addEventListener("click", (evt) => {
    onLike(evt, data._id, counter);
  });
  cardElementImage.addEventListener("click", () => onImage(data));
  if (data.owner._id !== myId) {
    cardElementDelete.remove();
  } else {
    cardElementDelete.addEventListener("click", (evt) => {
      onDelete(evt, data._id);
    });
  }
  return cardElement;
}

export { createCard, handleDeleteCard, handleLikeCard };
