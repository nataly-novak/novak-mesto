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
  const elementTemplateSelector = document.querySelector('#element');
  const inactiveButtonClass =  'popup__save-button_disabled';
  const popupImageTitle = document.querySelector('.popup__image-title');
  const imageViewer = popupImage.querySelector('.popup__image');

  function openPopupPerson(){
    nameInput.value = nameOutput.textContent ;
    jobInput.value = jobOutput.textContent ;
    openPopup(popupPerson);
    validatorPerson.validateForm();

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
    validatorPlace.validateForm();
  }

  function handleFormSubmitPlace (evt) {
    evt.preventDefault();
    const path = pathInput.value
    const title = titleInput.value
    const newCard = {image: path, altText:title, title: title};
    addCard(newCard);
    closePopup(popupPlace);
  }

  function popupCloseEscape(evt){
    if (evt.key==='Escape'){
      const popup = document.querySelector('.popup_visible')
      closePopup(popup);
    }
  }
  function openPopup(popup){
    popup.classList.remove('popup_hidden');
    popup.classList.add('popup_visible');
    document.addEventListener('keydown', popupCloseEscape);
  }
  function showPopupImage(src, alt){
    popupImageTitle.textContent = alt;
    imageViewer.src = src;
    imageViewer.alt = alt;
    openPopup(popupImage);
  }

  function closePopup(popup){
    popup.classList.remove('popup_visible');
    popup.classList.add('popup_hidden');
    document.removeEventListener('keydown', popupCloseEscape)
  }

  function addCard(picture){
    const newCard = new Card(picture, elementTemplateSelector, showPopupImage)
    cardContainer.prepend(newCard.createElement());
  }

  function popupCloseOverlay(evt){
    const popup = evt.currentTarget;
    if (evt.target === evt.currentTarget) {
      closePopup(popup)
    }
  }

  popupPerson.addEventListener('click', popupCloseOverlay);
  popupImage.addEventListener('click', popupCloseOverlay);
  popupPlace.addEventListener('click', popupCloseOverlay);
  popupPersonCloseButton.addEventListener('click',() => closePopup(popupPerson));
  popupPlaceCloseButton.addEventListener('click',() => closePopup(popupPlace));
  popupImageCloseButton.addEventListener('click',() => closePopup(popupImage));
  profileEditButton.addEventListener('click', openPopupPerson);
  profileAddButton.addEventListener('click', openPopupPlace);
  formElementPerson.addEventListener('submit', handleFormSubmitPerson);
  formElementPlace.addEventListener('submit', handleFormSubmitPlace);

  const validatorPlace = new FormValidator({
    popupSelector: '.popup_place',
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup_type_error',
    errorClass: 'popup__error_active',
    inactiveButtonClass:  'popup__save-button_disabled'
  });

  const validatorPerson = new FormValidator({
    popupSelector: '.popup_person',
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup_type_error',
    errorClass: 'popup__error_active',
    inactiveButtonClass:  'popup__save-button_disabled'
  });

  validatorPerson.enableValidation()
  validatorPlace.enableValidation()



  images.forEach((item) => {
    addCard(item)
  });
})();
