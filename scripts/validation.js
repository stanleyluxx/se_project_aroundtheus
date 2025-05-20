// look for all the inputs inside of form(completed)
// loop through all of the inputs to see if they are all valid(completed)
// if input is not valid(completed)
//get validation message(completed)
// add error class to input(completed)
// display error message(completed)
// disable button(complete)
// if all inputs are valid
// enable button(completed)
// reset error messages

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
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, config);
  } else {
    hideInputError(formElement, inputElement, config);
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
}

function setEventListeners(formElement, config) {
  const { inputSelector } = config;
  const inputElements = Array.from(formElement.querySelectorAll(inputSelector));
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
const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
enableValidation(config);
