(()=>{"use strict";var t={576:(t,e,n)=>{t.exports=n.p+"images/logo.0863e5bc26221680f1e2.svg"}},e={};function n(o){var r=e[o];if(void 0!==r)return r.exports;var c=e[o]={exports:{}};return t[o](c,c.exports,n),c.exports}n.m=t,n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),n.p="",n.b=document.baseURI||self.location.href,(()=>{function t(t,e,n){var o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"";return fetch("https://nomoreparties.co/v1/wff-cohort-10/".concat(e,"/").concat(o),{method:t,headers:{authorization:"2861e698-c93e-4af8-bc74-4f3b70e5bd6e","Content-Type":"application/json"},body:JSON.stringify(n)})}function e(t,e){return new Promise((function(n,o){console.log("Запрос отклонён",t),o(e)}))}function o(){return t("GET","users/me").then((function(t){return t.ok?t.json():e(t.status,t.ok)}))}function r(n,o){(function(){return t("DELETE","cards",{},arguments.length>0&&void 0!==arguments[0]?arguments[0]:"").then((function(t){return!!t.ok||e(t.status,t.ok)}))})(o).then((function(t){t&&n.target.closest(".card").remove()})).catch((function(t){console.log(t)}))}function c(n,o,r){(function(n,o){return t(o,"cards/likes",{},n).then((function(t){return!!t.ok||e(t.status,t.ok)}))})(o,n.target.classList.contains("card__like-button_is-active")?"DELETE":"PUT").then((function(t){r.textContent=t.likes.length,n.target.classList.toggle("card__like-button_is-active")})).catch((function(t){console.log(t)}))}function u(t,e,n,o,r){var c=document.querySelector("#card-template").content.querySelector(".places__item").cloneNode(!0),u=c.querySelector(".card__image"),i=c.querySelector(".card__title"),a=c.querySelector(".card__delete-button"),s=c.querySelector(".like-count"),l=c.querySelector(".card__like-button");return u.setAttribute("src",t.link),u.setAttribute("alt","Картинка местности ".concat(t.name)),i.textContent=t.name,t.likes.some((function(t){return t._id===r}))&&l.classList.add("card__like-button_is-active"),s.textContent=t.likes.length,l.addEventListener("click",(function(e){n(e,t._id,s)})),u.addEventListener("click",(function(){return o(t)})),t.owner._id!==r?a.remove():a.addEventListener("click",(function(n){e(n,t._id)})),c}function i(t){t.classList.add("popup_is-opened"),document.addEventListener("keydown",s)}function a(t){t.classList.remove("popup_is-opened"),document.removeEventListener("keydown",s)}function s(t){"Escape"===t.key&&a(document.querySelector(".popup_is-opened"))}var l,p=function(t,e,n){var o=t.querySelector(".".concat(e.id,"-error"));e.classList.remove(n.inputErrorClass),o.classList.remove(n.errorClass),o.textContent=""},d=function(t,e,n){f(t)?m(e,n,!0):m(e,n,!1)},f=function(t){return t.some((function(t){return!t.validity.valid}))},m=function(t,e,n){t.disabled=n,n?t.classList.add(e.inactiveButtonClass):t.classList.remove(e.inactiveButtonClass)},_=function(t,e){var n=Array.from(t.querySelectorAll(e.inputSelector)),o=t.querySelector(e.submitButtonSelector);m(o,e,!0),n.forEach((function(n){p(t,n,e)}))},v={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"form__submit_inactive",inputErrorClass:"form__input_type_error",errorClass:"form__input-error_active"},y=new URL(n(576),n.b),g=document.querySelector(".places__list"),h=document.forms["edit-profile"],k=document.forms["new-place"],S=document.forms["new-avatar"],b=document.querySelector(".profile__title"),q=document.querySelector(".profile__description"),C=document.querySelector(".profile__image"),E=document.querySelector(".profile__edit-button"),L=document.querySelector(".profile__add-button"),x=document.querySelector(".popup_type_new-avatar"),A=document.querySelector(".popup_type_edit"),w=document.querySelector(".popup_type_new-card"),T=document.querySelector(".popup_type_image"),P=T.querySelector(".popup__image"),j=T.querySelector(".popup__caption");function B(t){return new Promise((function(e,n){var o=new Image;o.onload=function(){e(t)},o.onerror=function(){n(t)},o.src=t}))}function D(t){return Promise.all(t).then((function(t){var e=t[0],n=t[1]._id;Array.isArray(e)?e.forEach((function(t){B(t.link).then((function(){g.append(u(t,r,c,O,n))})).catch((function(t){console.log(t)}))})):B(e.link).then((function(){g.prepend(u(e,r,c,O,n))})).catch((function(t){console.log(t)}))}))}function O(t){P.setAttribute("src",t.link),P.setAttribute("alt","Картинка местности ".concat(t.name)),j.textContent=t.name,i(T)}o().then((function(t){b.textContent=t.name,q.textContent=t.about,C.setAttribute("style","background-image: url(".concat(t.avatar,")"))})).catch((function(t){console.log(t)})),document.querySelector(".logo").setAttribute("src",y),D([t("GET","cards").then((function(t){return t.ok?t.json():e(t.status,t.ok)})),o()]).catch((function(t){console.log("Ошибка",t)})),l=v,Array.from(document.querySelectorAll(l.formSelector)).forEach((function(t){!function(t,e){var n=Array.from(t.querySelectorAll(e.inputSelector)),o=t.querySelector(e.submitButtonSelector);d(n,o,e),n.forEach((function(r){r.addEventListener("input",(function(){!function(t,e,n){e.validity.patternMismatch?e.setCustomValidity(e.dataset.errorMessage):e.setCustomValidity(""),e.validity.valid?p(t,e,n):function(t,e,n,o){var r=t.querySelector(".".concat(e.id,"-error"));e.classList.add(o.inputErrorClass),r.textContent=n,r.classList.add(o.errorClass)}(t,e,e.validationMessage,n)}(t,r,e),d(n,o,e)}))}))}(t,l)})),document.querySelectorAll(".popup").forEach((function(t){t.classList.add("popup_is-animated"),t.addEventListener("mousedown",(function(e){(e.target.classList.contains("popup_is-opened")||e.target.classList.contains("popup__close"))&&a(t)}))})),h.addEventListener("submit",(function(n){n.preventDefault();var o,r,c=n.target.querySelector(".popup__button");c.textContent="Сохранение...",(o=h.name.value,r=h.description.value,t("PATCH","users/me",{name:o,about:r}).then((function(t){return t.ok?t.json():e(t.status,t.ok)}))).then((function(t){b.textContent=t.name,q.textContent=t.about})).catch((function(t){console.log(t)})).finally((function(){c.textContent="Сохранить",a(n.target.closest(".popup")),_(n.target,v)}))})),k.addEventListener("submit",(function(n){n.preventDefault();var r,c,u=n.target.querySelector(".popup__button"),i={name:k["place-name"].value,link:k.link.value};u.textContent="Сохранение...",(r=i.name,c=i.link,t("POST","cards",{name:r,link:c}).then((function(t){return t.ok?t.json():e(t.status,t.ok)}))).then((function(t){D([t,o()])})).catch((function(t){console.log("Ошибка",t)})).finally((function(){u.textContent="Сохранить",a(n.target.closest(".popup")),_(n.target,v)}))})),S.addEventListener("submit",(function(n){n.preventDefault();var o,r=S.link.value,c=n.target.querySelector(".popup__button");c.textContent="Сохранение...",(o=r,t("PATCH","users/me/avatar",{avatar:o}).then((function(t){return t.ok?t.json():e(t.status,t.ok)}))).then((function(t){C.setAttribute("style","background-image: url(".concat(t.avatar,")"))})).catch((function(t){console.log(t)})).finally((function(){c.textContent="Сохранить",_(n.target,v),a(n.target.closest(".popup"))}))})),E.addEventListener("click",(function(){_(A,v),h.name.value=b.textContent,h.description.value=q.textContent,i(A)})),C.addEventListener("click",(function(){S.reset(),i(x),_(x,v)})),L.addEventListener("click",(function(){k.reset(),i(w),_(w,v)}))})()})();