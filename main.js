(()=>{"use strict";var e={117:(e,t,n)=>{e.exports=n.p+"6666407ac3aa5af1d5de.jpg"},576:(e,t,n)=>{e.exports=n.p+"0863e5bc26221680f1e2.svg"}},t={};function n(o){var r=t[o];if(void 0!==r)return r.exports;var c=t[o]={exports:{}};return e[o](c,c.exports,n),c.exports}n.m=e,n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.p="",n.b=document.baseURI||self.location.href,(()=>{function e(e){e.target.closest(".card").remove()}function t(e){e.target.classList.toggle("card__like-button_is-active")}function o(e,t,n,o){var r=document.querySelector("#card-template").content.querySelector(".places__item").cloneNode(!0),c=r.querySelector(".card__image"),a=r.querySelector(".card__title"),s=r.querySelector(".card__delete-button"),i=r.querySelector(".card__like-button");return c.setAttribute("src",e.link),c.setAttribute("alt","Картинка местности ".concat(e.name)),a.textContent=e.name,s.addEventListener("click",t),i.addEventListener("click",n),c.addEventListener("click",(function(){return o(e)})),r}function r(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",a)}function c(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",a)}function a(e){"Escape"===e.key&&c(document.querySelector(".popup_is-opened"))}var s=new URL(n(117),n.b),i=new URL(n(576),n.b),p=document.querySelector(".places__list"),u=document.forms["edit-profile"],d=document.forms["new-place"],l=document.querySelector(".profile__title"),m=document.querySelector(".profile__description"),f=document.querySelector(".profile__edit-button"),_=document.querySelector(".profile__add-button"),v=document.querySelector(".popup_type_edit"),y=document.querySelector(".popup_type_new-card"),k=document.querySelector(".popup_type_image"),g=k.querySelector(".popup__image"),b=k.querySelector(".popup__caption");function q(e){g.setAttribute("src",e.link),g.setAttribute("alt","Картинка местности ".concat(e.name)),b.textContent=e.name,r(k)}function S(e){return new Promise((function(t,n){var o=new Image;o.onload=function(){t(e)},o.onerror=function(){n(e)},o.src=e}))}document.querySelector(".profile__image").setAttribute("style","background-image: url(".concat(s,")")),document.querySelector(".logo").setAttribute("src",i),[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(n){S(n.link).then((function(){p.append(o(n,e,t,q))})).catch((function(){console.log("Ошибка ссылки")}))})),u.addEventListener("submit",(function(e){e.preventDefault(),l.textContent=u.name.value,m.textContent=u.description.value,c(e.target.closest(".popup"))})),d.addEventListener("submit",(function(n){n.preventDefault();var r={name:d["place-name"].value,link:d.link.value};S(r.link).then((function(){p.prepend(o(r,e,t,q))})).catch((function(){console.log("Ошибка ссылки")})),c(n.target.closest(".popup")),d.reset()})),f.addEventListener("click",(function(){u.name.value=l.textContent,u.description.value=m.textContent,r(v)})),_.addEventListener("click",(function(){return r(y)})),document.querySelectorAll(".popup").forEach((function(e){e.classList.add("popup_is-animated"),e.addEventListener("mousedown",(function(t){t.target.classList.contains("popup_is-opened")&&c(e),t.target.classList.contains("popup__close")&&c(e)}))}))})()})();