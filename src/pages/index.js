//Imports
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import "./index.css";
import {
  cardData,
  settings,
  editButton,
  addButton,
  profileTitle,
  profileDescription,
  profileTitleInput,
  profileDescriptionInput,
  editProfileFormElement,
  addCardFormElement,
  cardTemplateSelector,
} from "../utils/utils.js";

//UserInfo Instance
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

//Section Class Instance

const cardSection = new Section(
  {
    items: cardData,
    renderer: (item) => {
      const cardElement = createCard(item);
      cardSection.addItem(cardElement);
    },
  },
  ".cards__list"
);

cardSection.renderItems();
function createCard(data) {
  const card = new Card(data, cardTemplateSelector, handleImageClick);
  return card.getView();
}

//popupWithImage instance
const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

// Edit Profile Popup
const editProfilePopup = new PopupWithForm("#modal-edit", (formData) => {
  profileTitle.textContent = formData["profile-title"]; // match input `name` attributes
  profileDescription.textContent = formData["profile-description"];
});
editProfilePopup.setEventListeners();

// Add Card Popup
const addCardPopup = new PopupWithForm("#modal-add", (formData) => {
  const newCardData = {
    name: formData["card-title"],
    link: formData["card-link"],
  };
  const newCardElement = createCard(newCardData);
  cardSection.addItem(newCardElement);
});
addCardPopup.setEventListeners();

addButton.addEventListener("click", () => {
  addCardPopup.open();
});

editButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  editProfilePopup.open();
});

//FormValidator Class Instance
const editFormValidator = new FormValidator(settings, editProfileFormElement);
editFormValidator.enableValidation();

const addCardValidator = new FormValidator(settings, addCardFormElement);
addCardValidator.enableValidation();

function handleImageClick(name, link) {
  imagePopup.open({ name, link });
}
