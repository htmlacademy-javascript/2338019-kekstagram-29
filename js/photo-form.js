import { isInputFocus, pristineForm } from './photo-validation.js';
import { downScale, increaseScale } from './photo-scale.js';

const FILE_TYPE = ['jpg', 'jpeg', 'png'];

const uploadForm = document.querySelector('.img-upload__form');
const submitButton = uploadForm.querySelector('.img-upload__submit');
const imgUploadForm = uploadForm.querySelector('.img-upload__input');
const photoPreview = document.querySelector('.img-upload__preview img');
const effectPreview = document.querySelectorAll('.effects__preview');
const hiddenPhotoForm = uploadForm.querySelector('.img-upload__overlay');
const resetButton = uploadForm.querySelector('.img-upload__cancel');

const imgUploadFieldset = document.querySelector('.img-upload__scale');
const buttonScaleControlSmaller = imgUploadFieldset.querySelector('.scale__control--smaller');
const buttonScaleControlBigger = imgUploadFieldset.querySelector('.scale__control--bigger');

const imgEffectsContainer = uploadForm.querySelector('.img-upload__effect-level');
const uploadPreview = uploadForm.querySelector('.img-upload__preview');
const previewImage = uploadPreview.querySelector('img');

export const modalCounter = { value: 0 };

const isValidType = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPE.some((it) => fileName.endsWith(it));
};


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
  pristineForm.reset();
  document.removeEventListener('keydown', onDocumentKeydown);
  modalCounter.value--; //счетчик открытия модалок
};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape' && !(isInputFocus())) {
    evt.preventDefault();

    if (modalCounter.value > 1) {
      return;
    }
    onClickHideForm();
  }
}

const onChangeOpenForm = () => {
  hiddenPhotoForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  modalCounter.value++; //счетчик открытия модалок
};

const onFileInputChange = () => {
  const file = imgUploadForm.files[0];

  if (file && isValidType(file)) {
    photoPreview.src = URL.createObjectURL(file);
    effectPreview.forEach((preview) => {
      preview.style.backgroundImage = `url('${photoPreview.src}')`;
    });
  }
  onChangeOpenForm();
};

imgUploadForm.addEventListener('change', onFileInputChange);

resetButton.addEventListener('click', onClickHideForm);

buttonScaleControlSmaller.addEventListener('click', downScale);
buttonScaleControlBigger.addEventListener('click', increaseScale);

imgEffectsContainer.classList.add('hidden');


export {setOnFormSubmit, onClickHideForm};
