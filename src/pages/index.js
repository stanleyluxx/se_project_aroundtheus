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
import { Api } from "../utils/Api.js";

//UserInfo Instance
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

//Section Class Instance

const cardSection = new Section(
  {
    items: [],
    renderer: (item) => {
      const cardElement = createCard(item);
      return cardElement;
    },
  },
  ".cards__list"
);

function createCard(data) {
  const card = new Card(data, cardTemplateSelector, handleImageClick);
  return card.getView();
}

//popupWithImage instance
const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

// Edit Profile Popup
const editProfilePopup = new PopupWithForm("#modal-edit", (formData) => {
  userInfo.setUserInfo({
    name: formData["title"],
    job: formData["description"],
  });
});
editProfilePopup.setEventListeners();

//FormValidator Class Instance
const editFormValidator = new FormValidator(settings, editProfileFormElement);
editFormValidator.enableValidation();

const addCardValidator = new FormValidator(settings, addCardFormElement);
addCardValidator.enableValidation();

function handleImageClick(name, link) {
  imagePopup.open({ name, link });
}

// Add Card Popup
const addCardPopup = new PopupWithForm("#modal-add", (formData) => {
  api.addCard({
    name: formData["title"],
    link: formData["link"],
  })
  .then((cardData) => {
    const newCardElement = createCard(cardData);
    cardSection.addItem(newCardElement);
    addCardPopup.close(); // close modal after success
  })
  .catch((err) => {
    console.error("Failed to add card:", err);
  });
});
addCardPopup.setEventListeners();

addButton.addEventListener("click", () => {
  addCardPopup.open();
});

editButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  profileTitleInput.value = currentUserInfo.name;
  profileDescriptionInput.value = currentUserInfo.job;

  editFormValidator.resetValidation();

  editProfilePopup.open();
});

//API Instance And Method Calls
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
 headers: {
    authorization: "5cdcdfef-c3b6-49d6-830b-7f0207542704",
    "Content-Type": "application/json"
 }
});

api.getAppInfo()
.then(([userData, cards]) => {
    // set user info
    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about
    });

    // render cards
    cardSection.renderItems(cards);
  })
  .catch((err) => {
    console.error(err);
  });