import { isInputFocus, pristineForm } from './photo-validation.js';
import { downScale, increaseScale } from './photo-scale.js';


const uploadForm = document.querySelector('.img-upload__form');
const submitButton = uploadForm.querySelector('.img-upload__submit');
const imgUploadForm = uploadForm.querySelector('.img-upload__input');
const hiddenPhotoForm = uploadForm.querySelector('.img-upload__overlay');
const resetButton = uploadForm.querySelector('.img-upload__cancel');

const imgUploadFieldset = document.querySelector('.img-upload__scale');
const buttonScaleControlSmaller = imgUploadFieldset.querySelector('.scale__control--smaller');
const buttonScaleControlBigger = imgUploadFieldset.querySelector('.scale__control--bigger');

const imgEffectsContainer = uploadForm.querySelector('.img-upload__effect-level');
const uploadPreview = uploadForm.querySelector('.img-upload__preview');
const previewImage = uploadPreview.querySelector('img');
// const sliderElement = imgEffectsContainer.querySelector('.effect-level__slider');

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SUBMITTING: 'Отправляю...',
};

const toggleSubmitButton = (isDisabled) => {
  submitButton.disabled = isDisabled;
  submitButton.textContent = isDisabled
    ? SubmitButtonText.SUBMITTING
    : SubmitButtonText.IDLE;
};

const setOnFormSubmit = (callback) => {
  uploadForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristineForm.validate();

    if (isValid) {
      toggleSubmitButton(true);
      await callback(new FormData(uploadForm));
      toggleSubmitButton();
    }
  });
};

const onClickHideForm = () => {
  uploadForm.reset();
  imgUploadForm.value = '';
  previewImage.style.filter = '';
  imgEffectsContainer.classList.add('hidden');
  hiddenPhotoForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape' && !(isInputFocus())) {
    evt.preventDefault();
    onClickHideForm();
  }
}


const onChangeOpenForm = () => {
  hiddenPhotoForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

imgUploadForm.addEventListener('change', onChangeOpenForm);

resetButton.addEventListener('click', onClickHideForm);

buttonScaleControlSmaller.addEventListener('click', downScale);
buttonScaleControlBigger.addEventListener('click', increaseScale);

imgEffectsContainer.classList.add('hidden');

export {setOnFormSubmit, onClickHideForm};
