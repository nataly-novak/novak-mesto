const popupPerson = document.querySelector('.popup_person');
const popupPersonCloseButton = popupPerson.querySelector('.popup__close-button');
const popupPlace = document.querySelector('.popup_place');
const popupPlaceCloseButton = popupPlace.querySelector('.popup__close-button');
const popupImage = document.querySelector('.popup_image');
const popupImageTitle = document.querySelector('.popup__image-title');
const popupImageCloseButton = popupImage.querySelector('.popup__close-button');
const nameOutput = document.querySelector('.profile__name');
const jobOutput = document.querySelector('.profile__subtitle');
const formElementPerson = popupPerson.querySelector('.popup__form');
const nameInput = formElementPerson.querySelector('.popup__name');
const jobInput = formElementPerson.querySelector('.popup__comment');
const element = document.querySelector('.elements');
const formElementPlace = popupPlace.querySelector('.popup__form');
const titleInput = formElementPlace.querySelector('.popup__name');
const pathInput = formElementPlace.querySelector('.popup__comment');
const profileAddButton = document.querySelector('.profile__add-button');
const profileEditButton = document.querySelector('.profile__edit-button');
const image = popupImage.querySelector('.popup__image');



function closePopup(popup){
  popup.classList.remove('popup_visible');
  popup.classList.add('popup_hidden');
  document.removeEventListener('keydown', popupCloseEscape)
}



function openPopup(popup){
  popup.classList.remove('popup_hidden');
  popup.classList.add('popup_visible');
  document.addEventListener('keydown', popupCloseEscape);
}

function openPopupPerson(){
  nameInput.value = nameOutput.textContent ;
  jobInput.value = jobOutput.textContent ;
  openPopup(popupPerson);
  enableButton(popupPerson.querySelector('.popup__save-button'));

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
  disableButton(popupPlace.querySelector('.popup__save-button'))
}

function handleFormSubmitPlace (evt) {
  evt.preventDefault();
  const path = pathInput.value
  const title = titleInput.value
  const newCard = {image: path, altText:title, title: title};
  addCard(newCard);
  closePopup(popupPlace);
}

function showPopupImage(src, alt){
  popupImageTitle.textContent = alt;
  image.src = src;
  image.alt = alt;
  openPopup(popupImage);
}

function createElement(picture){
  const elementTemplate = document.querySelector('#element').content;
  const elementCard = elementTemplate.querySelector(".element").cloneNode(true);
  const image = elementCard.querySelector(".element__image");
  image.src = picture.image;
  image.alt = picture.title;
  elementCard.querySelector(".element__title").textContent = picture.title;
  const like = elementCard.querySelector(".element__like")
  like.addEventListener('click', function (evt) {
    const eventTarget = evt.target;
    eventTarget.classList.toggle("element__like_active");
  });
  const trash = elementCard.querySelector(".element__trash")
  trash.addEventListener('click', function (evt) {
    const element = evt.target.closest(".element");
    element.remove()
  });
  image.addEventListener('click',function (evt) {
    showPopupImage(evt.target.src, evt.target.alt)
  });
  return elementCard;
}

function addCard(picture){
  element.prepend(createElement(picture));
}

function popupCloseOverlay(evt){
  const popup = evt.currentTarget.closest(".popup")
  if (evt.target === evt.currentTarget) {
    closePopup(popup)
  }
}

function popupCloseEscape(evt){
  if (evt.key==='Escape'){
    const popup = document.querySelector('.popup_visible')

    closePopup(popup);
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


images.forEach((item) => {
  addCard(item)
});
