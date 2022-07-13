// включение валидации вызовом enableValidation
// все настройки передаются при вызове
export class FormValidator {
  constructor(validator){
    this._formSelector = validator.formSelector;
    this._inputSelector = validator.inputSelector;
    this._submitButtonSelector = validator.submitButtonSelector;
    this._inactiveButtonClass = validator.inactiveButtonClass;
    this._inputErrorClass = validator.inputErrorClass;
    this._errorClass = validator.errorClass;
    this._inactiveButtonClass = validator.inactiveButtonClass;
  }

  disableButton(button){
    button.classList.add(this._inactiveButtonClass);
    button.disabled = true;
  }
  enableButton(button){
    button.classList.remove(this._inactiveButtonClass)
    button.disabled = false;
  }
  _showInputError(formElement, inputElement, errorMessage){
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }
  _hideInputError(formElement, inputElement){
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }
  _checkInputValidity(formElement, inputElement){
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }
  _hasInvalidInput(inputList){
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  _toggleButtonState(inputList, buttonElement){
    if (this._hasInvalidInput(inputList)) {
      this.disableButton(buttonElement)
    } else {
      this.enableButton(buttonElement)
    }
  }
  _setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    const buttonElement = formElement.querySelector(this._submitButtonSelector);

    // чтобы проверить состояние кнопки в самом начале
    this._toggleButtonState(inputList, buttonElement);
    const self = this;
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        self._checkInputValidity(formElement, inputElement);
        // чтобы проверять его при изменении любого из полей
        self._toggleButtonState(inputList, buttonElement);
      });
    });
  }
  enableValidation(){
    const formList = Array.from(document.querySelectorAll(this._formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      this._setEventListeners(formElement)
    });
  }
}
