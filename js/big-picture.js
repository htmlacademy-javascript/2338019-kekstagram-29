const COMMENTS_PER_PORTION = 5;

const bigPictureElement = document.querySelector('.big-picture');
const commentsCountElement = bigPictureElement.querySelector('.social__comment-count');
const commentListElement = bigPictureElement.querySelector('.social__comments');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const bodyElement = document.querySelector('body');
const cancelButtonElement = bigPictureElement.querySelector('.big-picture__cancel');
const commentElement = document.querySelector('.social__comment');

let commentsShown = 0;
let comments = [];

const createComment = ({ avatar, name, message }) => {
  const comment = commentElement.cloneNode(true);

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const renderComments = () => {
  commentsShown += COMMENTS_PER_PORTION;

  if (commentsShown >= comments.length) {
    commentsLoaderElement.classList.add('hidden');
    commentsShown = comments.length;
  } else {
    commentsLoaderElement.classList.remove('hidden');
    commentsCountElement.classList.remove('hidden');

  }

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsShown; i++) {
    const comment = createComment(comments[i]);
    fragment.append(comment);
  }

  commentListElement.innerHTML = '';
  commentListElement.append(fragment);
  commentsCountElement.innerHTML = `${commentsShown} из <span class="comments-count">${comments.length}</span> комментариев`;

};

const hideBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  commentsShown = 0;
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

const onCommentsLoaderClick = () => renderComments();

const renderPictureDetails = ({ url, likes, description }) => { //функция принимает объект с описанием конкретного изображения.
  bigPictureElement.querySelector('.big-picture__img img').src = url;
  bigPictureElement.querySelector('.big-picture__img img').alt = description;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  bigPictureElement.querySelector('.social__caption').textContent = description;
};

const showBigPicture = (data) => {
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  commentsLoaderElement.classList.add('hidden');
  commentsCountElement.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeydown);

  renderPictureDetails(data);
  comments = data.comments;
  if (comments.length > 0) {
    renderComments();
  }
};

cancelButtonElement.addEventListener('click', onCancelButtonClick); //событие по клику - закрытие модалки.
commentsLoaderElement.addEventListener('click', onCommentsLoaderClick);

export {showBigPicture};
