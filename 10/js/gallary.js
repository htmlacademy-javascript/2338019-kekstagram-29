import {resRenderPictures} from './rendering.js';
import {showBigPicture} from './big-picture.js';

const container = document.querySelector('.pictures');

const renderGallery = (pictures) => {

  container.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-thumbnail-id]'); //с помощью closest ищем ближайшего родителя.
    if (!thumbnail) {
      return;
    }

    evt.preventDefault();
    const picture = pictures.find(
      (item) => item.id === +thumbnail.dataset.thumbnailId //таким образом извелкаем значение и обязательно приводим его к строке.
    );
    showBigPicture(picture);

  });

};

renderGallery(resRenderPictures);

export {resRenderPictures};
