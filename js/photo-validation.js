const MAX_HASHTAGS = 5;
const VALID_HASHTAG = /^#[a-zа-яë0-9]{1,19}$/i;
const ERROR_TEXT = {
  invalidCount: `нельзя указать больше ${MAX_HASHTAGS} хэш-тэгов`,
  invalidHashtag: 'не верно введен хеш-тег',
  notUnique: 'хэш-тэги не должны повторяться',
};

// Находим элементы в разметке
const uploadForm = document.querySelector('.img-upload__form');
const textContainer = document.querySelector('.img-upload__text');
const tagsInput = textContainer.querySelector('.text__hashtags');
const commentInput = textContainer.querySelector('.text__description');
const submitButton = uploadForm.querySelector('.img-upload__submit');

// Сообщения об ошибке
const errorPristine = {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
};

const isInputFocus = () => {
  if (document.activeElement === tagsInput || document.activeElement === commentInput) {
    return true;
  }
};

// Из наборов хэштегов сделать массив
const hashtagsList = (tags) => tags.trim().split(' ');

// Проверка есть ли хэштег в массиве
const validateRepeatedHastags = (value) => {
  const newArray = hashtagsList(value.toLowerCase());
  const uniqAray = [...new Set(newArray)];
  return newArray.toString() === uniqAray.toString();
};

// Проверка размера массива
const validateNumberOfHashtags = (value) => hashtagsList(value).length <= MAX_HASHTAGS;

// Проверка валидности
const validateInvalideTag = (value) => {
  const filterArray = hashtagsList(value).filter((element) => VALID_HASHTAG.test(element));
  return hashtagsList(value).toString() === filterArray.toString();
};

const pristineForm = new Pristine(uploadForm, errorPristine);

const setValidator = () => {

  pristineForm.addValidator(
    tagsInput,
    validateRepeatedHastags,
    ERROR_TEXT.notUnique,
    1,
    true
  );

  pristineForm.addValidator(
    tagsInput,
    validateInvalideTag,
    ERROR_TEXT.invalidHashtag,
    2,
    true
  );

  pristineForm.addValidator(
    tagsInput,
    validateNumberOfHashtags,
    ERROR_TEXT.invalidCount,
    3,
    true
  );
};

submitButton.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristineForm.validate();
});

setValidator();

export {isInputFocus, pristineForm};
