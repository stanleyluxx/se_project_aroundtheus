// Cards
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const cardData = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// Form Validator Settings
const settings = {
  formSelector: ".modal__form", // This selector is not used by FormValidator directly anymore but can be helpful for selecting forms outside the class.
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

/*--------- */
/* Elements */
/*----------*/

//edit button elements
const editButton = document.querySelector("#open-edit-btn");
const editModal = document.querySelector("#modal-edit");
const closeEditButton = document.querySelector("#modal-close-button");

//add button elements
const addButton = document.querySelector("#open-add-btn");
const addModal = document.querySelector("#modal-add");
const closeAddButton = document.querySelector("#modal-create-close-button");

//profile elements
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector(".modal__input-type-title");
const profileDescriptionInput = document.querySelector(
  ".modal__input-type-description"
);
const profileEditForm = document.querySelector("#modal-edit-form"); // This is #edit-profile-form

const cardListEl = document.querySelector(".cards__list");
const cardTemplateSelector = "#card-template"; // Changed to a selector string for Card constructor

const profileCreateTitleInput = document.querySelector(
  ".modal__create-input-type-title"
);
const profileImageLinkInput = document.querySelector(".modal__input-type-link");
const addCardForm = document.querySelector("#modal-create-form"); // This is #add-card-form

//image popup elements
const imageModal = document.querySelector("#image-popup");
const modalImageElement = imageModal.querySelector(".modal__image");
const modalCaptionElement = imageModal.querySelector(".modal__image-caption");
const modalImageClose = imageModal.querySelector(".modal__image-close-button");

/*----------------------------*/
/* Initialize Form Validators */
/*----------------------------*/

const editProfileFormElement = document.querySelector("#modal-edit-form");
const addCardFormElement = document.querySelector("#modal-create-form");

const editFormValidator = new FormValidator(settings, editProfileFormElement);
editFormValidator.enableValidation();

const addCardValidator = new FormValidator(settings, addCardFormElement);
addCardValidator.enableValidation();

/*------------------*/
/* Functions        */
/*------------------*/

// Re-factored card rendering using the Card class
function renderCard(data, wrapper) {
  const card = new Card(data, cardTemplateSelector, handleImageClick);
  wrapper.prepend(card.getView());
}
// Handler for opening image popup from Card class
function handleImageClick(name, link) {
  modalImageElement.src = link;
  modalImageElement.alt = name;
  modalCaptionElement.textContent = name;
  openModal(imageModal);
}

// Universal open modal function
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscape);
}

// Universal close modal function
function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscape);
}

// Escape key handler for modals
function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

/*------------------*/
/* Event Handlers  */
/*------------------*/

// Edit Modal Form Handler
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(editModal);
}

// Add Modal Form Handler
function handleAddFormSubmit(e) {
  e.preventDefault();

  const title = profileCreateTitleInput.value;
  const imageUrl = profileImageLinkInput.value;

  const newCardData = {
    name: title,
    link: imageUrl,
  };

  renderCard(newCardData, cardListEl); // Use the new renderCard function

  e.target.reset(); // Reset the form fields

  closeModal(addModal);
  addCardValidator.resetValidation(); // Reset validation state for the add card form
}

/*------------------*/
/* Event Listeners  */
/*------------------*/

// Edit Modal
editButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;

  editFormValidator.resetValidation(); // Reset validation state for the edit form
  openModal(editModal);
});
// edit modal close button function
closeEditButton.addEventListener("click", () => closeModal(editModal));

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

// Add Modal
addButton.addEventListener("click", () => {
  openModal(addModal);
});
closeAddButton.addEventListener("click", () => closeModal(addModal));

addCardForm.addEventListener("submit", handleAddFormSubmit); // Changed to addCardForm

// Initial Card Rendering
cardData.forEach((data) => {
  renderCard(data, cardListEl);
});

// popup image close function
modalImageClose.addEventListener("click", () => closeModal(imageModal));

//Modals mousedown Function (close on overlay click)
const modals = document.querySelectorAll(".modal");
modals.forEach((modal) => {
  modal.addEventListener("mousedown", (e) => {
    if (e.target === modal) {
      closeModal(modal);
    }
  });
});
