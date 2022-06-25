// включение валидации вызовом enableValidation
// все настройки передаются при вызове



const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}


const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) =>{
  if (hasInvalidInput(inputList)) {
  buttonElement.classList.add(inactiveButtonClass);
} else {
  buttonElement.classList.remove(inactiveButtonClass);
}
}

const setEventListeners = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  // чтобы проверить состояние кнопки в самом начале
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
      // чтобы проверять его при изменении любого из полей
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};


const enableValidation = (argument) => {
  console.log(argument.formSelector)
  const formList = Array.from(document.querySelectorAll(argument.formSelector));
  formList.forEach((formElement) => {
    console.log(formElement)
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, argument.inputSelector, argument.submitButtonSelector, argument.inactiveButtonClass, argument.inputErrorClass, argument.errorClass)
  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup_type_error',
  errorClass: 'popup__error_active'
});
