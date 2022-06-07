const images = [{image:"./images/elements-flying-cathedrall.jpg",altText:"Парящий в воздухе готический собор на закате",title: "Парящий Собор"},
{image:"./images/elements-jordan-palace.jpg",altText:"Красно-оранжевое готическое здание на черном фоне",title: "Дворец Проклятого Города"},
{image:"./images/elements-last-isle.jpg",altText:"Остров в море с руинами",title: "Руины Последнего Острова"},
{image:"./images/elements-magic-school.jpg",altText:"Замок в горах покрытых зеленью",title: "Школа Магии"},
{image:"./images/elements-truro-cathedral.jpg",altText:"Черно-белый готический собор на скале",title: "Кафедральный собор Труро"},
{image:"./images/elements-venice.jpg",altText:"Мост над каналом, лодка, люди в масках",title: "Венецианский Карнавал"}];

let popupPerson = document.querySelector('.popup_person');
let popupPersonCloseButton = popupPerson.querySelector('.popup__close-button');
let popupPlace = document.querySelector('.popup_place');
let popupPlaceCloseButton = popupPlace.querySelector('.popup__close-button');
let popupImage = document.querySelector('.popup_image');
let popupImageCloseButton = popupImage.querySelector('.popup__close-button');

function closePopup(popup){
  popup.classList.remove('popup_visible');
  popup.classList.add('popup_hidden');
}
popupPersonCloseButton.addEventListener('click',() => {closePopup(popupPerson)});
popupPlaceCloseButton.addEventListener('click',() => {closePopup(popupPlace)});
popupImageCloseButton.addEventListener('click',() => {closePopup(popupImage)});

let profileEditButton = document.querySelector('.profile__edit-button');
function openPopupPerson(){
  let nameOutput = document.querySelector('.profile__name');// Воспользуйтесь инструментом .querySelector()
  let jobOutput = document.querySelector('.profile__subtitle');
  let nameInput = formElementPerson.querySelector('.popup__name');
  let jobInput = formElementPerson.querySelector('.popup__comment');
  nameInput.value = nameOutput.textContent ;
  jobInput.value = jobOutput.textContent ;
  popupPerson.classList.remove('popup_hidden');
  popupPerson.classList.add('popup_visible');
}


profileEditButton.addEventListener('click', openPopupPerson);


let formElementPerson = popupPerson.querySelector('.popup__form');
let nameInput = formElementPerson.querySelector('.popup__name');
let jobInput = formElementPerson.querySelector('.popup__comment');

function formSubmitHandlerPerson (evt) {
    evt.preventDefault();
    let name = nameInput.value
    let job = jobInput.value

    let nameOutput = document.querySelector('.profile__name');
    let jobOutput = document.querySelector('.profile__subtitle');
    nameOutput.textContent = name;
    jobOutput.textContent = job;
    closePopup(popupPerson)
}

formElementPerson.addEventListener('submit', formSubmitHandlerPerson);
let formElementPlace = popupPlace.querySelector('.popup__form');
let titleInput = formElementPlace.querySelector('.popup__name');
let pathInput = formElementPlace.querySelector('.popup__comment');

let profileAddButton = document.querySelector('.profile__add-button');
function openPopupPlace(){
  pathInput.value = ""
  titleInput.value = ""
  popupPlace.classList.remove('popup_hidden');
  popupPlace.classList.add('popup_visible');

}
profileAddButton.addEventListener('click', openPopupPlace);



function formSubmitHandlerPlace (evt) {
    evt.preventDefault();
    let path = pathInput.value
    let title = titleInput.value
    let newCard = {image: path, altText:"", title: title}
    images.push(newCard);
    renderCards()
    closePopup(popupPlace)
}

formElementPlace.addEventListener('submit', formSubmitHandlerPlace);

function showPopupImage(src, alt){
  let img = popupImage.querySelector('.popup__image');
  img.src = src;
  img.alt = alt;
  popupImage.classList.remove('popup_hidden');
  popupImage.classList.add('popup_visible');

}

function createElement(picture)

{
  const elementTemplate = document.querySelector('#element').content;
  const elementCard = elementTemplate.querySelector(".element").cloneNode(true);
  const image = elementCard.querySelector(".element__image");
  image.src = picture.image;
  image.alt = picture.altText;
  elementCard.querySelector(".element__title").textContent = picture.title;

  let like = elementCard.querySelector(".element__like")
  like.addEventListener('click', function (evt) {
    const eventTarget = evt.target;
    eventTarget.classList.toggle("element__like_active");
  });
  let trash = elementCard.querySelector(".element__trash")
  trash.addEventListener('click', function (evt) {
    let container = evt.target.parentElement;
    let element = container.parentElement;
    let id = Array.from(element.parentElement.children).indexOf(element)
    element.remove()
    images.splice(id, 1);
  });
  image.onclick = (evt) => {
    showPopupImage(evt.target.src, evt.target.alt)
  }
  const elements = document.querySelector('.elements');
  elements.append(elementCard);
}

function renderCards(){
  const elements = document.querySelector('.elements');
  const allElements = elements.querySelectorAll(".element")
  allElements.forEach((item ) => {
    item.remove();
  });

  images.forEach((item) => {
    createElement(item);
  });
}
renderCards();
