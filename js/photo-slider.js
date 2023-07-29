const EFFECTS_VALUES = {
  'none': {
    options: {
      start: 1,
      step: 0.1,
      range: {
        'min': 0,
        'max': 1
      },
      connect: 'lower',
      format: {
        to: function (value) {
          if (Number.isInteger(value)) {
            return value.toFixed(0);
          }
          return value.toFixed(1);
        },
        from: function (value) {
          return parseFloat(value);
        },
      },
      suffix: '',
    }
  },
  'chrome': {
    filter: 'grayscale',
    options: {
      start: 1,
      step: 0.1,
      range: {
        'min': 0,
        'max': 1
      },
      format: {
        to: function (value) {
          if (Number.isInteger(value)) {
            return value.toFixed(0);
          }
          return value.toFixed(1);
        },
        from: function (value) {
          return parseFloat(value);
        },
      },
      suffix: '',
    }
  },
  'sepia': {
    filter: 'sepia',
    options: {
      start: 1,
      step: 0.1,
      range: {
        'min': 0,
        'max': 1
      },
      format: {
        to: function (value) {
          if (Number.isInteger(value)) {
            return value.toFixed(0);
          }
          return value.toFixed(1);
        },
        from: function (value) {
          return parseFloat(value);
        },
      },
      suffix: '',
    },
  },
  'marvin': {
    filter: 'invert',
    options: {
      start: 100,
      step: 1,
      range: {
        'min': 0,
        'max': 100
      },
      format: {
        to: function (value) {
          return value;
        },
        from: function (value) {
          return parseFloat(value);
        },
      },
      suffix: '%',
    },
  },
  'phobos': {
    filter: 'blur',
    options: {
      start: 3,
      step: 0.1,
      range: {
        'min': 0,
        'max': 3
      },
      format: {
        to: function (value) {
          if (Number.isInteger(value)) {
            return value.toFixed(0);
          }
          return value.toFixed(1);
        },
        from: function (value) {
          return parseFloat(value);
        },
      },
      suffix: 'px',
    }
  },
  'heat': {
    filter: 'brightness',
    options: {
      start: 3,
      step: 0.1,
      range: {
        'min': 1,
        'max': 3
      },
      format: {
        to: function (value) {
          if (Number.isInteger(value)) {
            return value.toFixed(0);
          }
          return value.toFixed(1);
        },
        from: function (value) {
          return parseFloat(value);
        },
      },
      suffix: '',
    }
  }
};

// Превью картинка
const uploadForm = document.querySelector('.img-upload__form');
const uploadPreview = uploadForm.querySelector('.img-upload__preview');
const previewImage = uploadPreview.querySelector('img');

// Эффекты
const imgEffectsContainer = uploadForm.querySelector('.img-upload__effect-level');
const imgEffectsButtons = uploadForm.querySelector('.img-upload__effects');
const sliderElement = imgEffectsContainer.querySelector('.effect-level__slider');
const inputEffectValue = imgEffectsContainer.querySelector('.effect-level__value');
const effectButtons = imgEffectsButtons.querySelectorAll('input[type="radio"]');

noUiSlider.create(sliderElement, EFFECTS_VALUES['none'].options);

let theme = {};

for (const button of effectButtons) {
  button.addEventListener('change', (evt) => {
    if (evt.target.checked) {
      imgEffectsContainer.classList.remove('hidden');
      sliderElement.removeAttribute('disabled');
      theme = EFFECTS_VALUES[button.value];
      previewImage.style.filter = `${theme.filter}(${theme.options.start}${theme.options.suffix})`;
      sliderElement.noUiSlider.updateOptions(theme.options);
    }
    if (evt.target.value === 'none') {
      imgEffectsContainer.classList.add('hidden');
      sliderElement.setAttribute('disabled', true);
      previewImage.style.filter = '';
    }
  });
}

const onSliderUpdate = () => {
  inputEffectValue.value = sliderElement.noUiSlider.get();
  previewImage.style.filter = `${theme.filter}(${inputEffectValue.value}${theme.options.suffix})`;
};

sliderElement.noUiSlider.on('update', onSliderUpdate);

