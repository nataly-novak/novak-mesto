import {openPopup, showPopupImage, popupCloseEscape, closePopup} from "./popup.js"
import {Card} from "./Card.js"
import {FormValidator} from "./FormValidator.js"
import {images} from "./cards.js"

(function(){
  const popupPerson = document.querySelector('.popup_person');
  const popupPersonCloseButton = popupPerson.querySelector('.popup__close-button');
  const popupPlace = document.querySelector('.popup_place');
  const popupPlaceCloseButton = popupPlace.querySelector('.popup__close-button');
  const popupImage = document.querySelector('.popup_image');
  const popupImageCloseButton = popupImage.querySelector('.popup__close-button');
  const nameOutput = document.querySelector('.profile__name');
  const jobOutput = document.querySelector('.profile__subtitle');
  const formElementPerson = popupPerson.querySelector('.popup__form');
  const nameInput = formElementPerson.querySelector('.popup__name');
  const jobInput = formElementPerson.querySelector('.popup__comment');
  const cardContainer = document.querySelector('.elements');
  const formElementPlace = popupPlace.querySelector('.popup__form');
  const titleInput = formElementPlace.querySelector('.popup__name');
  const pathInput = formElementPlace.querySelector('.popup__comment');
  const profileAddButton = document.querySelector('.profile__add-button');
  const profileEditButton = document.querySelector('.profile__edit-button');
  const elementTemplate = document.querySelector('#element').content;
  const inactiveButtonClass =  'popup__save-button_disabled';

  function openPopupPerson(){
    nameInput.value = nameOutput.textContent ;
    jobInput.value = jobOutput.textContent ;
    openPopup(popupPerson);
    validator.enableButton(popupPerson.querySelector('.popup__save-button'));

  }

  function handleFormSubmitPerson (evt) {
    evt.preventDefault();
    const name = nameInput.value
    const job = jobInput.value
    nameOutput.textContent = name;
    jobOutput.textContent = job;
    closePopup(popupPerson);
  }

  function openPopupPlace(){
    formElementPlace.reset();
    openPopup(popupPlace);
    validator.disableButton(popupPlace.querySelector('.popup__save-button'))
  }

  function handleFormSubmitPlace (evt) {
    evt.preventDefault();
    const path = pathInput.value
    const title = titleInput.value
    const newCard = {image: path, altText:title, title: title};
    addCard(newCard);
    closePopup(popupPlace);
  }

  function addCard(picture){
    const newCard = new Card(picture, elementTemplate)
    cardContainer.prepend(newCard.createElement());
  }

  function popupCloseOverlay(evt){
    const popup = evt.currentTarget.closest(".popup")
    if (evt.target === evt.currentTarget) {
      closePopup(popup)
    }
  }

  popupPerson.addEventListener('click', popupCloseOverlay);
  popupImage.addEventListener('click', popupCloseOverlay);
  popupPlace.addEventListener('click', popupCloseOverlay);
  document.addEventListener('keydown', popupCloseEscape);
  popupPersonCloseButton.addEventListener('click',() => closePopup(popupPerson));
  popupPlaceCloseButton.addEventListener('click',() => closePopup(popupPlace));
  popupImageCloseButton.addEventListener('click',() => closePopup(popupImage));
  profileEditButton.addEventListener('click', openPopupPerson);
  profileAddButton.addEventListener('click', openPopupPlace);
  formElementPerson.addEventListener('submit', handleFormSubmitPerson);
  formElementPlace.addEventListener('submit', handleFormSubmitPlace);

  const validator = new FormValidator({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup_type_error',
    errorClass: 'popup__error_active',
    inactiveButtonClass:  'popup__save-button_disabled'
  });

  validator.enableValidation()


  images.forEach((item) => {
    addCard(item)
  });
})();
