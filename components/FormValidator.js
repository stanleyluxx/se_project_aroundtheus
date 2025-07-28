export default class FormValidator {
  // constructor(settings, formElement) {
  //   this._inputSelector = settings.inputSelector;
  //   this._submitButtonSelector = settings.submitButtonSelector;
  //   this._inactiveButtonClass = settings.inactiveButtonClass;
  //   this._inputErrorClass = settings.inputErrorClass;
  //   this._errorClass = settings.errorClass;

  //   this._form = formElement;
  //   this._inputElements = Array.from(
  //     this._form.querySelectorAll(this._inputSelector)
  //   );
  //   this._submitButton = this._submitButtonSelector;
  // }
  constructor(
    {
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass,
      errorClass,
    },
    formElement
  ) {
    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;

    this._form = formElement;
    this._inputElements = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    this._submitButton = this._form.querySelector(submitButtonSelector);
  }

  _showInputError(inputElement) {
    const errorMessageElement = this._form.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorMessageElement.textContent = inputElement.validationMessage;
    errorMessageElement.classList.add(this._errorClass);

    if (errorMessageElement) {
      errorMessageElement.textContent = inputElement.validationMessage;
      errorMessageElement.classList.add(this._errorClass);
    }
  }

  _hideInputError(inputElement) {
    const errorMessageElement = this._form.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);

    if (errorMessageElement) {
      errorMessageElement.textContent = "";
      errorMessageElement.classList.remove(this._errorClass);
    }
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _disableButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  _enableButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
    console.log(this._submitButton);
  }

  _hasInvalidInput() {
    return this._inputElements.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }

  _setEventListeners() {
    this._inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    console.log(this._submitButton);
    this._toggleButtonState();
  }

  enableValidation() {
    this._setEventListeners();
  }

  resetValidation() {
    this._inputElements.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this._disableButton();
  }
}
