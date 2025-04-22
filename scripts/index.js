/*------------------*/
/*   Cards          */
/*------------------*/

const initialCards = [
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

/*------------------*/
/*    Elements      */
/*------------------*/
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
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = document.querySelector("#modal-form");

const cardListEl = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template");

const profileCreateTitleInput = document.querySelector(
  "#profile-create-title-input"
);
const profileImageLinkInput = document.querySelector(
  "#profile-image-link-input"
);
const addForm = document.querySelector("#modal-create-form");
//image popup elements
const imageModal = document.querySelector("#image-popup")
const modalImageElement = imageModal.querySelector(".modal__image");
const modalCaptionElement = imageModal.querySelector(".modal__image-caption");
const modalImageClose = imageModal.querySelector(".modal__image-close-button");

/*------------------*/
/*   Functions      */
/*------------------*/

// Open and Close Modal Functions

function openModal(modal) {
  if (modal) {
    modal.classList.add("modal_opened");
  } else {
    console.error("Modal not found:", modal);
  }
}

function closeModal(modal) {
  if (modal) {
    modal.classList.remove("modal_opened");
  }
}

// Card Creation Function
function getCardElement(cardData) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deletebutton = cardElement.querySelector(".card__delete-button");
  //card event listeners/functions
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  deletebutton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    modalImageElement.src = cardData.link;
    modalImageElement.alt = cardData.name;
    modalCaptionElement.textContent = cardData.name;
    openModal(imageModal);
  });

  cardTitleEl.textContent = cardData.name;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;

  return cardElement;
}

/*------------------*/
/*  Event Handlers  */
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

  const newCard = {
    name: title,
    link: imageUrl,
  };

  cardListEl.prepend(getCardElement(newCard));

  profileCreateTitleInput.value = "";
  profileImageLinkInput.value = "";

  closeModal(addModal);
}

/*------------------*/
/* Event Listeners  */
/*------------------*/

// Edit Modal
editButton.addEventListener("click", () => openModal(editModal));
closeEditButton.addEventListener("click", () => closeModal(editModal));
profileEditForm.addEventListener("submit", handleProfileEditSubmit);

// Add Modal
addButton.addEventListener("click", () => openModal(addModal));
closeAddButton.addEventListener("click", () => closeModal(addModal));
addForm.addEventListener("submit", handleAddFormSubmit);

// Initial Card Rendering
initialCards.forEach((cardData) => {
  cardListEl.append(getCardElement(cardData));
});


// popup image close function
modalImageClose.addEventListener("click", () => closeModal(imageModal));


