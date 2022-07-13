import {showPopupImage} from "./popup.js"
export class Card{
  constructor(picture, elementTemplate){
    this._picture = picture;
    this._elementTemplate = elementTemplate;
    this._elementCard = this._elementTemplate.querySelector(".element").cloneNode(true);
    this._image = this._elementCard.querySelector(".element__image");
    this._like = this._elementCard.querySelector(".element__like")
    this._trash = this._elementCard.querySelector(".element__trash")

  }

  _handleLike(evt){
    const eventTarget = evt.target;
    eventTarget.classList.toggle("element__like_active");
  }
  _handleTrash(evt){
    const element = evt.target.closest(".element");
    element.remove()
  }
  _handlePopup(evt){
    showPopupImage(evt.target.src, evt.target.alt)
  }
  _setEventListeners(){
    this._like.addEventListener('click',(evt) => {
      this._handleLike(evt)
    });
    this._trash.addEventListener('click',(evt) => {
      this._handleTrash(evt)
    });
    this._image.addEventListener('click',(evt) => {
      this._handlePopup(evt)
    });
  }


  createElement(){
    this._image.src = this._picture.image;
    this._image.alt = this._picture.title;
    this._elementCard.querySelector(".element__title").textContent = this._picture.title;
    this._setEventListeners();
    return this._elementCard;
  }
}
