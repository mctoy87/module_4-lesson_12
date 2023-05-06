'use strict';

(() => {
  const FIGURES_ENG = ['rock', 'scissors', 'paper'];
  const FIGURES_RUS = ['камень', 'ножницы', 'бумага'];

  const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // ищет внутри строки (i-ый эл-т массива) нужный набор букв
  const findLetters = (arr, n) => {
    for (let i = 0; i < arr.length; ++i) {
      // если внутри строки arr[i] найдется искомая подстрока, то
      // indexOf вернет индекс этой буквы (начала подстроки) должно совпасть с 0
      if (arr[i].indexOf(n) === 0) {
        return arr[i];
      }
    }
    return false;
  };

  // меняет для alert слова под выбранный язык
  const getFigure = language => {
    const resume = ['Результат', 'Игрок', 'Компьютер', 'Ничья',
      'Вы выиграли', 'Вы проиграли'];
    // если выбран ENG, то вырезает и заменяет в массиве слова
    if (language === 'EN' || language === 'ENG') {
      resume.splice(0, 6, 'Results', 'player', 'computer',
          'draw', `You've won`, 'You lose');
    }
    return resume;
  };

  const game = (language) => {
    const result = { // результаты игр
      player: 0,
      computer: 0,
      // показывает результат игр (\n - это перенос строки в alert и prompt)
      get getResult() {
        return alert(`${getFigure(language)[0]}: 
        ${getFigure(language)[2]}: ${this.computer} 
        ${getFigure(language)[1]}: ${this.player}`);
      },
    };
    // определяем на каком языке игра
    const lang = language === 'EN' || language === 'ENG' ?
    FIGURES_ENG : FIGURES_RUS;

    return function start() {
      // функция выхода из игры
      const isEnough = () => {
        // запрос пользователя на выход из игры
        const exit = language === 'EN' || language === 'ENG' ?
        confirm('Do you want to exit the game?') :
        confirm('Хочешь выйти из игры?');
        // Если жмет отмену, то продолжить игру
        if (!exit) {
          return start();
        } else {
          result.getResult; // выдать результат
        }
      };

      // возвращаем значение строки от пользователя
      // слож. задание  - отображаем массив значений через lang.join
      const userChoose = prompt(`${lang.join(', ')} ?`);
      // проверка на отмену или пустую строку
      if (!userChoose) {
        isEnough(); // функция выхода из игры
      } else {
        // ищет то что ввел пользователь в элементах массива FIGURES_RUS
        const userResult = findLetters(lang, userChoose.toLowerCase());
        // возвращает рандомное значение массива игры
        const pcChoose = lang[getRandomIntInclusive(0, 2)];
        // если результат сравнения ввода пользователя с массивом (true)
        if (userResult) {
          if (userResult === pcChoose) {
            alert(`${getFigure(language)[2]}: ${pcChoose}
        ${getFigure(language)[1]}: 
        ${userResult} \n ${getFigure(language)[3]}`);
            // ветка выигрыша. для слож. задания используется элемент массива
          } else if (((userResult === lang[0]) && (pcChoose === lang[1])) ||
            ((userResult === lang[1]) && (pcChoose === lang[2])) ||
            ((userResult === lang[2]) && (pcChoose === lang[0]))) {
            alert(`${getFigure(language)[2]}: ${pcChoose} 
${getFigure(language)[1]}: ${userResult} 
${getFigure(language)[4]}`);
            result.player += 1; // добавляем к счету игрока
          } else {
            alert(`${getFigure(language)[2]}: ${pcChoose} 
${getFigure(language)[1]}: ${userResult} 
${getFigure(language)[5]}`);
            result.computer += 1; // добавляем к счету компа
          }
          return start();
          // если результат сравнения с массивом false
        } else {
          isEnough(); // функция выхода из игры
        }
      }
    };
  };
  window.RPS = game;
})();
