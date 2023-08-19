const ALERT_SHOW_TIME = 5000;

const showAlert = (message) => {
  const alert = document.createElement('div');
  alert.style.position = 'absolute';
  alert.style.zIndex = '100';
  alert.style.left = '0';
  alert.style.top = '0';
  alert.style.right = '0';
  alert.style.padding = '10px 3px';
  alert.style.fontSize = '30px';
  alert.style.textAlign = 'center';
  alert.style.backgroundColor = 'red';
  alert.style.lineHeight = '2';
  alert.textContent = message;
  document.body.append(alert);

  setTimeout(() => {
    alert.remove();
  }, ALERT_SHOW_TIME);
};

export {showAlert};


// // Генератор рандомных чисел
// const getRandomInteger = (min, max) => {
//   const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
//   const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
//   const result = Math.random() * (upper - lower + 1) + lower;
//   return Math.floor(result);
// };

// // Возвращает случайный элемент массива
// const getRandomArrayElement = (array) =>
//   array[getRandomInteger(0, array.length - 1)];

// // Генератор уникального id для comments
// const createIdGenerator = () => {
//   let lastGeneratrdId = 0;
//   return () => {
//     lastGeneratrdId += 1;
//     return lastGeneratrdId;
//   };
// };
// const generateCommentId = createIdGenerator();

// export {getRandomInteger, getRandomArrayElement, generateCommentId};
