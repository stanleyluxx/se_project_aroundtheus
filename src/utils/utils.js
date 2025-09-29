
// Form Validator settings
export const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

// DOM Elements
export const editButton = document.querySelector("#open-edit-btn");
export const addButton = document.querySelector("#open-add-btn");
export const avatarEditButton = document.querySelector(".profile__avatar-edit-button");


export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(".profile__description");
export const profileTitleInput = document.querySelector(".modal__input-type-title");
export const profileDescriptionInput = document.querySelector(".modal__input-type-description");

export const editProfileFormElement = document.querySelector("#modal-edit-form");
export const addCardFormElement = document.querySelector("#modal-create-form");

export const cardTemplateSelector = "#card-template";