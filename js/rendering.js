const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createPictures = ({comments, desctiption, likes, url, id}) => {

  const pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = desctiption;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.dataset.thumbnailId = id;

  return pictureElement;
};

const renderPictures = (pictures, container) => {
  container.querySelectorAll('.picture').forEach((element) => element.remove());
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const pictureElement = createPictures(picture);
    fragment.append(pictureElement);
  });

  container.append(fragment);
};

export {renderPictures};
