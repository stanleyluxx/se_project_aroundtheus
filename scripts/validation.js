
function showInputError(
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) {
  const errorMessageElement = formElement.querySelector(
    `#${inputElement.id}-error`
  );
  inputElement.classList.add(inputErrorClass);
  errorMessageElement.textContent = inputElement.validationMessage;
  errorMessageElement.classList.add(errorClass);
}

function hideInputError(
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) {
  const errorMessageElement = formElement.querySelector(
    `#${inputElement.id}-error`
  );
  inputElement.classList.remove(inputErrorClass);

  errorMessageElement.textContent = "";
  errorMessageElement.classList.remove(errorClass);
}

function checkInputValidity(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  if (!inputElement.validity.valid) {
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(config.errorClass);
  } else {
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(config.errorClass);
  }
}


// disable button function
function disableButton(button, inactiveClass) {
  button.classList.add(inactiveClass);
  button.disabled = true;
}
// enable button function
function enableButton(button, inactiveClass) {
  button.classList.remove(inactiveClass);
  button.disabled = false;
}

// hasInvalidInput Function
function hasInvalidInput(inputElements) {
  return inputElements.some((inputElement) => !inputElement.validity.valid);
}

//toggleButtonState function
function toggleButtonState(
  inputElements,
  submitButton,
  { inactiveButtonClass }
) {
  if (hasInvalidInput(inputElements)) {
    disableButton(submitButton, inactiveButtonClass);
    return;
  }
  enableButton(submitButton, inactiveButtonClass);
  toggleButtonState();
}

//set Event Listeners
function setEventListeners(formElement, config) {
  const inputElements = Array.from(formElement.querySelectorAll(config.inputSelector));
  const submitButton = formElement.querySelector(".modal__button");
  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", (e) => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(
        inputElements,
        submitButton,
        config.inactiveButtonClass
      );
    });
  });
}

function enableValidation(config) {
  const formElements = Array.from(
    document.querySelectorAll(config.formSelector)
  );
  formElements.forEach((formElement) => {
    formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    setEventListeners(formElement, config);
  });
}

function resetValidation(formElement, config) {
  const inputElements = Array.from(formElement.querySelectorAll(config.inputSelector));
  const errorMessages = formElement.querySelectorAll(`.${config.errorClass}`);
  const submitButton = formElement.querySelector(config.submitButtonSelector);

  inputElements.forEach((input) => {
    input.classList.remove(config.inputErrorClass, "modal__input_valid");
  });

  errorMessages.forEach((errorEl) => {
    errorEl.textContent = "";
    errorEl.classList.remove(config.errorClass);
  });

  disableButton(submitButton, config.inactiveButtonClass);
}
const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
enableValidation(config);