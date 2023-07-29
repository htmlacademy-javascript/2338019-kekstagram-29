const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
let scale = 100;

const imgUploadFieldset = document.querySelector('.img-upload__scale');
const scaleControlValue = imgUploadFieldset.querySelector('.scale__control--value');
const uploadForm = document.querySelector('.img-upload__form');
const uploadPreview = uploadForm.querySelector('.img-upload__preview');
const previewImage = uploadPreview.querySelector('img');

const downScale = () => {
  scale -= SCALE_STEP;
  if (scale <= MIN_SCALE) {
    scale = MIN_SCALE;
  }
  scaleControlValue.value = `${scale}%`;
  previewImage.style.transform = `scale(${scale / 100})`;
};

const increaseScale = () => {
  scale += SCALE_STEP;
  if (scale >= MAX_SCALE) {
    scale = MAX_SCALE;
  }
  scaleControlValue.value = `${scale}%`;
  previewImage.style.transform = `scale(${scale / 100})`;
};

export {downScale, increaseScale};
