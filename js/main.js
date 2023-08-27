import './photo-slider.js';

import {renderGallery} from './gallary.js';
import {getData, sendData} from './api-fetch.js';
import {showAlert, debounce} from './util.js';
import {setOnFormSubmit, onClickHideForm} from './photo-form.js';
import {showSuccessMessage, showErrorMessage} from './message.js';
import {init, getFilteredPicture} from './filter.js';

setOnFormSubmit(async (data) => {
  try {
    await sendData (data);
    onClickHideForm();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
});

try {
  const data = await getData();
  const debounceRenderPictures = debounce(renderGallery);
  init(data, debounceRenderPictures);
  renderGallery(getFilteredPicture());
} catch (err) {
  showAlert(err.message);
}
