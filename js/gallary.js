import {renderPictures} from './rendering.js';
import {showBigPicture} from './big-picture.js';

const container = document.querySelector('.pictures');

let pictures = [];

const onContainerClick = (evt) => {
  const thumbnail = evt.target.closest('[data-thumbnail-id]'); //с помощью closest ищем ближайшего родителя.
  if (!thumbnail) {
    return;
  }

  evt.preventDefault();
  const picture = pictures.find(
    (item) => item.id === +thumbnail.dataset.thumbnailId //таким образом извелкаем значение и обязательно приводим его к строке.
  );
  showBigPicture(picture);
};

const renderGallery = (currentPictures) => {
  pictures = currentPictures;
  renderPictures(pictures, container);
  container.addEventListener('click', onContainerClick);
};

export {renderGallery};
