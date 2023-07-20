import {createDataGeneration} from './data.js';

const pictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderPictures = () => {

  const pictureListFragment = document.createDocumentFragment();

  createDataGeneration.forEach((data) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = data.url;
    pictureElement.querySelector('.picture__comments').textContent = data.comments.length;
    pictureElement.querySelector('.picture__likes').textContent = data.like;
    pictureElement.dataset.thumbnailId = data.id;
    pictureListFragment.appendChild(pictureElement);
  });

  pictures.appendChild(pictureListFragment);

  return createDataGeneration;

};

const resRenderPictures = renderPictures();

export {resRenderPictures};

