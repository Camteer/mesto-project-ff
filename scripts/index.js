// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу


const cardsContainer = document.querySelector('.places__list');

function handleDeleteCard (element) {
  element.target.parentElement.remove();
}

function addCard(data, onDelete) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  cardElement.querySelector('.card__image').setAttribute('src', data.link);
  cardElement.querySelector('.card__image').setAttribute('alt', `Картинка местности ${data.name}`)
  cardElement.querySelector('.card__title').textContent = data.name;
  
  cardElement.querySelector('.card__delete-button').addEventListener('click', onDelete);
  return cardElement
};

initialCards.forEach(function (element) {
  cardsContainer.append(addCard(element, handleDeleteCard));
});