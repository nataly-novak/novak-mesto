export function popupCloseEscape(evt){
  if (evt.key==='Escape'){
    const popup = document.querySelector('.popup_visible')

    closePopup(popup);
  }
}
export function openPopup(popup){
  popup.classList.remove('popup_hidden');
  popup.classList.add('popup_visible');
  document.addEventListener('keydown', popupCloseEscape);
}
export function showPopupImage(src, alt){
  const popupImage = document.querySelector('.popup_image');
  const popupImageTitle = document.querySelector('.popup__image-title');
  const imageViewer = popupImage.querySelector('.popup__image');
  popupImageTitle.textContent = alt;
  imageViewer.src = src;
  imageViewer.alt = alt;
  openPopup(popupImage);
}

export function closePopup(popup){
  popup.classList.remove('popup_visible');
  popup.classList.add('popup_hidden');
  document.removeEventListener('keydown', popupCloseEscape)
}
