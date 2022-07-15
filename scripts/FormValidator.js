// включение валидации вызовом enableValidation
// все настройки передаются при вызове
export class FormValidator {
  constructor(validator){
    this._formElement = validator.formElement;
    this._inputSelector = validator.inputSelector;
    this._submitButtonSelector = validator.submitButtonSelector;
    this._inactiveButtonClass = validator.inactiveButtonClass;
    this._inputErrorClass = validator.inputErrorClass;
    this._errorClass = validator.errorClass;
    this._inactiveButtonClass = validator.inactiveButtonClass;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  }

  _disableButton(){
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
  }
  _enableButton(){
    this._buttonElement.classList.remove(this._inactiveButtonClass)
    this._buttonElement.disabled = false;
  }
  _showInputError(inputElement, errorMessage){
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }
  _hideInputError(inputElement){

    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }
  _checkInputValidity(inputElement){
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }
  _hasInvalidInput(){
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  _toggleButtonState(){
    if (this._hasInvalidInput(this._inputList)) {
      this._disableButton()
    } else {
      this._enableButton()
    }
  }
  _setEventListeners() {
    // чтобы проверить состояние кнопки в самом начале
    this._toggleButtonState();
    const self = this;
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        self._checkInputValidity(inputElement);
        // чтобы проверять его при изменении любого из полей
        self._toggleButtonState();
      });
    });
  }
  enableValidation(){
    this._setEventListeners(this._formElement)
  }
  clearValidation(){
    this._inputList.forEach((inputElement) => {
      this._checkInputValidity(inputElement);
      this._hideInputError(inputElement)
      this._toggleButtonState(this._inputList, this._buttonElement);

    });
  }
}
