import { modalCounter } from './photo-form.js';
const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');
const body = document.querySelector('body');

function hideMessage() {
  const messageElement = document.querySelector('.success') || document.querySelector('.error');
  messageElement.remove();
  body.removeEventListener('click', onBodyClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  modalCounter.value--; //счетчик открытия модалок
}
function onBodyClick(evt) {
  if (
    evt.target.closest('.success__inner') ||
    evt.target.closest('.error__inner')
  ) {
    return;
  }
  hideMessage();
}

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideMessage();
  }
}

const showMessage = (messageElement, closeButtonClass) => {
  body.append(messageElement);
  messageElement.querySelector(closeButtonClass).addEventListener('click', hideMessage);
  body.addEventListener('click', onBodyClick);
  document.addEventListener('keydown', onDocumentKeydown);
  modalCounter.value++; //счетчик открытия модалок
};

const showSuccessMessage = () => {
  showMessage(successMessage, '.success__button');
};

const showErrorMessage = () => {
  showMessage(errorMessage, '.error__button');
};

export {showErrorMessage, showSuccessMessage};
