let popup = document.querySelector('.popup');
let popupCloseButton = popup.querySelector('.popup__close-button');

function closePopup(){
  popup.classList.add('popup_disabled');
}
popupCloseButton.addEventListener('click', closePopup);

let profileEditButton = document.querySelector('.profile__edit-button');
function openPopup(){
  popup.classList.remove('popup_disabled');
  let nameOutput = document.querySelector('.profile__name');// Воспользуйтесь инструментом .querySelector()
  let jobOutput = document.querySelector('.profile__subtitle');
  let nameInput = formElement.querySelector('.popup__name');
  let jobInput = formElement.querySelector('.popup__comment');
  nameInput.value = nameOutput.textContent ;
  jobInput.value = jobOutput.textContent ;
}

profileEditButton.addEventListener('click', openPopup);

// Находим форму в DOM
let formElement = document.querySelector('.popup__form');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.popup__name');// Воспользуйтесь инструментом .querySelector()
let jobInput = formElement.querySelector('.popup__comment');// Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    let name = nameInput.value
    let job = jobInput.value
    // Выберите элементы, куда должны быть вставлены значения полей
    let nameOutput = document.querySelector('.profile__name');// Воспользуйтесь инструментом .querySelector()
    let jobOutput = document.querySelector('.profile__subtitle');
    // Вставьте новые значения с помощью textContent
    nameOutput.textContent = name;
    jobOutput.textContent = job;
    closePopup()
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
