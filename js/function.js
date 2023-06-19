//Функция для проверки длины строки
const getLengthString = (text, maxLength) => text.length <= maxLength;

getLengthString('проверяемая строка', 10); // false

//Функция для проверки, является ли строка палиндромом
const CheckPalindrome = (text) => {
  const textReady = text.toLowerCase().replaceAll(' ', '');
  return textReady.split('').reverse().join('') === textReady;
};

CheckPalindrome('Лёша на полке клопа нашёл ');
