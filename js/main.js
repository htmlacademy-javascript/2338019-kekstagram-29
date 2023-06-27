const PICTURE_COUNT = 25;
const LIKE_NUMBER_MIN = 15;
const LIKE_NUMBER_MAX = 200;
const AVATAR_NUMBER = 6;
const COMMENT_COUNT = 30;
const DESCRIPTIONS_ARRAY = [
  'Гуляем с друзьями. ',
  'Отмечаем день рождение.',
  'Приехали на пикник с друзьями.',
  'Закат на берегу черного моря в Сочи.',
  'Фото дома после ремонта.',
  'Фото моего сына, ему 1 год.',
  'Вот так тут кормят.',
  'Что можно сделать своими руками!',
  'Жизнь хороша, когда пьешь не спеша',
  'Когда для счастья, нужно...',
  'Отлично!',
];
const COMMENT_LINES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const NAMES_ARRAY = ['Степан', 'Вася', 'Гоша', 'Артур', 'Кирил', 'Евгений'];

// Генератор рандомных чисел
const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// Возвращает случайный элемент массива
const getRandomArrayElement = (array) =>
  array[getRandomInteger(0, array.length - 1)];

// Генератор уникального id для comments
const createIdGenerator = () => {
  let lastGeneratrdId = 0;
  return () => {
    lastGeneratrdId += 1;
    return lastGeneratrdId;
  };
};
const generateCommentId = createIdGenerator();

// Функция создает массивы и объекты
const getArrayCount = (count, description, names, comment) => {
  const photos = [];
  for (let i = 0; i < count; i++) {

    const createComment = () => ({
      id: count + generateCommentId(),
      avatar: `img/avatar-${getRandomInteger(1, AVATAR_NUMBER)}.svg`,
      message: `${getRandomArrayElement(comment)} ${getRandomArrayElement(comment)}`,
      name: getRandomArrayElement(names)});

    const photo = {
      id: i + 1,
      url: `photos/${i + 1}.jpg`,
      descriotion: getRandomArrayElement(description),
      like: getRandomInteger(LIKE_NUMBER_MIN, LIKE_NUMBER_MAX),
      comments: Array.from({length: getRandomInteger(0, COMMENT_COUNT)},createComment),
    };
    photos.push(photo);
  }
  return photos;
};

const createDataGeneration = getArrayCount(PICTURE_COUNT, DESCRIPTIONS_ARRAY, NAMES_ARRAY, COMMENT_LINES);
