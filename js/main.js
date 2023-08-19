import './rendering.js';
import './gallary.js';
import './big-picture.js';
import './photo-form.js';
import './photo-slider.js';

import {getData, sendData} from './api-fetch.js';
import {renderPictures} from './rendering.js';
import {renderGallery} from './gallary.js';
import {showAlert} from './util.js';
import {setOnFormSubmit, onClickHideForm} from './photo-form.js';
import {showSuccessMessage, showErrorMessage} from './message.js';

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
  renderPictures(data);
  renderGallery(data);
} catch (err) {
  showAlert(err.message);
}
