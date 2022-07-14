export class Card{
  constructor(picture, elementTemplateSelector, showPopupImage){
    this._picture = picture;
    this._elementTemplate = elementTemplateSelector.content;
    this._elementCard = this._elementTemplate.querySelector(".element").cloneNode(true);
    this._image = this._elementCard.querySelector(".element__image");
    this._like = this._elementCard.querySelector(".element__like")
    this._trash = this._elementCard.querySelector(".element__trash")
    this._showPopupImage = showPopupImage;

  }

  _handleLike(evt){
    this._like.classList.toggle("element__like_active");
  }
  _handleTrash(evt){
    this._elementCard.remove();
    this._elementCard = null;
  }
  _handlePopup(evt){
    this._showPopupImage(this._picture.image, this._picture.title)
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
