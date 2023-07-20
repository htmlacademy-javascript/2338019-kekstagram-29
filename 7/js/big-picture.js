// import {renderGallery} from './gallary.js';

const bigPictureElement = document.querySelector('.big-picture');
const commentsCountElement = bigPictureElement.querySelector('.social__comment-count');
const commentListElement = bigPictureElement.querySelector('.social__comments');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const bodyElement = document.querySelector('body');
const cancelButtonElement = bigPictureElement.querySelector('.big-picture__cancel');
const commentElement = document.querySelector('.social__comment');

const createComment = ({ avatar, name, message }) => {
  const comment = commentElement.cloneNode(true);

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const renderComments = (comments) => {
  commentListElement.innerHTML = '';

  const fragment = document.createDocumentFragment();
  comments.forEach((item) => {
    const comment = createComment(item);
    fragment.append(comment);
  });

  commentListElement.append(fragment);
};

const hideBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideBigPicture();
  }
}

const onCancelButtonClick = () => {
  hideBigPicture();
};

const renderPictureDetails = ({ url, like, descriotion, comments }) => { //функция принимает объект с описанием конкретного изображения.
  bigPictureElement.querySelector('.big-picture__img img').src = url;
  bigPictureElement.querySelector('.big-picture__img img').alt = descriotion;
  bigPictureElement.querySelector('.likes-count').textContent = like;
  bigPictureElement.querySelector('.social__caption').textContent = descriotion;
  bigPictureElement.querySelector('.comments-count').textContent = comments.length;
};

const showBigPicture = (data) => {
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  commentsLoaderElement.classList.add('hidden');
  commentsCountElement.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeydown);

  renderPictureDetails(data);
  renderComments(data.comments);
};

cancelButtonElement.addEventListener('click', onCancelButtonClick); //событие по клику - закрытие модалки.

export {showBigPicture};
