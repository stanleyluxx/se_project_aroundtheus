//Imports
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import "./index.css";
import {
  settings,
  editButton,
  addButton,
  avatarEditButton,
  profileTitleInput,
  profileDescriptionInput,
  editProfileFormElement,
  addCardFormElement,
  cardTemplateSelector,
} from "../utils/utils.js";
import { Api } from "../utils/Api.js";

//API Instance And Method Calls
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
 headers: {
    authorization: "5cdcdfef-c3b6-49d6-830b-7f0207542704",
    "Content-Type": "application/json"
 }
});

//UserInfo Instance
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

//Section Class Instance
const cardSection = new Section(
  {
    renderer: (item) => {
      const cardElement = createCard(item);
      return cardElement;
    },
  },
  ".cards__list"
);

api.getAppInfo()
  .then(([userData, cards]) => {
    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
    });
    cardSection.renderItems(cards); // ✅ now from API
  })
  .catch(err => console.error(err));

function createCard(data) {
  const card = new Card(data, cardTemplateSelector, handleImageClick, handleDeleteClick, handleLikeClick);
  return card.getView();
}

//popupWithImage instance
const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

// Edit Profile Popup
const editProfilePopup = new PopupWithForm("#modal-edit", (formData) => {
  editProfilePopup.renderLoading(true);
  api.updateUserInfo({
    name: formData["title"],
    about: formData["description"],
  })
  .then((updatedUser) => {
    userInfo.setUserInfo({
      name: updatedUser.name,
      job: updatedUser.about,
    });
    editProfilePopup.close();
  })
  .catch((err) => console.error(err))
  .finally(() => {
      editProfilePopup.renderLoading(false);
});
});
editProfilePopup.setEventListeners();

// AvatarPopup instance
const avatarPopup = new PopupWithForm("#modal-avatar", (formData) => {
  avatarPopup.renderLoading(true);
  api.updateAvatar(formData.avatar)
    .then((userData) => {
      userInfo.setUserAvatar(userData.avatar); // update DOM
      avatarPopup.close();
    })
    .catch((err) => console.error(err))
    .finally(() => {
      avatarPopup.renderLoading(false);
    });
});
avatarPopup.setEventListeners();

avatarEditButton.addEventListener("click", () => {
  avatarPopup.open();
});

//DeletePopup Instance
let currentCardId = null;
let currentCardElement = null;

const deletePopup = new PopupWithConfirmation("#delete-card-popup", (formData) => {
  api.deleteCard(currentCardId)
    .then(() => {
      currentCardElement.remove(); // remove the card from the DOM
      deletePopup.close();
    })
    .catch((err) => console.error(err));
});
deletePopup.setEventListeners();

function handleDeleteClick(cardId, cardElement) {
  currentCardId = cardId;
  currentCardElement = cardElement;
  deletePopup.open();
}

//handle-Like Click instance

function handleLikeClick(cardId, likeButton) {
  if (likeButton.classList.contains("card__like-button_active")) {
    api.removeLike(cardId)
      .then((updatedCard) => {
        likeButton.classList.remove("card__like-button_active");
      })
      .catch((err) => console.error(err));
  } else {
    api.addLike(cardId)
      .then((updatedCard) => {
        likeButton.classList.add("card__like-button_active");
      })
      .catch((err) => console.error(err));
  }
}

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



