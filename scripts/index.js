// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу


const cardsContainer = document.querySelector('.places__list');

function handleDeleteCard (element) {
  element.target.parentElement.remove();
}

function addCard(element, def) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  cardElement.querySelector('.card__image').setAttribute('src', element.link);
  cardElement.querySelector('.card__image').setAttribute('alt', `Картинка местности ${element.name}`)
  cardElement.querySelector('.card__title').textContent = element.name;
  
  cardElement.querySelector('.card__delete-button').addEventListener('click', def);
  return cardsContainer.append(cardElement);
};

initialCards.forEach(function (element) {
  addCard(element, handleDeleteCard)
});