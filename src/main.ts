import * as moment from 'moment';

const timerBox: HTMLElement | null = document.querySelector('#timer');

if (timerBox) {
  timerBox.style.textAlign = 'center';
  timerBox.style.fontSize = '40px';
}

/**
 * This function helps with specifying styles for buttons.
 * @param button link to button
 * @param fontSize font size of the button
 * @param padding padding of the button
 * @param margin margin of the button
 * @param background background of the button
 * @param border border of the button
 * @param cursor cursor style when hover
 */
function setButtonStyles(
  button: HTMLElement,
  fontSize: string,
  padding: string,
  margin: string,
  background: string,
  border: string,
  cursor: string,
) {
  const btn = button;
  btn.style.fontSize = fontSize;
  btn.style.padding = padding;
  btn.style.margin = margin;
  btn.style.background = background;
  btn.style.border = border;
  btn.style.cursor = cursor;
}

/**
 * This function converts number of seconds in to proper time (minutes:seconds).
 * @param seconds number of seconds
 * @returns string that contains minutes and seconds
 */
function showProperTime(seconds: number): string {
  let min: string | number = seconds / 60;

  if (min < 10) {
    min = `0${Math.floor(seconds / 60)}`;
  } else {
    min = Math.floor(seconds / 60);
  }

  let sec: string | number = seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60;

  if (sec < 10) {
    sec = `0${seconds % 60}`;
  } else {
    sec = seconds % 60;
  }

  const time = `${min}:${sec}`;
  return time;
}

/**
 * This function helps with toggling elements.
 * It toggles display style from 'display: inline' to 'display: none' and backwards.
 * @param elementsArray Array that contains HTML elements which need to be toggled.
 */
function toggleElements(elementsArray: HTMLElement[]) {
  const elements = elementsArray;
  elements.forEach((element) => {
    const elem = element;
    elem.style.display = elem.style.display === 'none' ? 'inline' : 'none';
  });
}

/**
 * This function adds event listeners on buttons listed below.
 * @param minus link to a minus button
 * @param plus link to a plus button
 * @param counterText text of the counter
 * @param start link to a start button
 */
function addEvents(
  minus: HTMLElement,
  plus: HTMLElement,
  counterText: HTMLElement,
  start: HTMLElement,
) {
  const minusBtn = minus;
  const plusBtn = plus;
  const startBtn = start;
  const counterTxt = counterText;

  let counter: number = 0;
  counterTxt.innerText = `${counter}`;

  minusBtn.addEventListener('click', () => {
    if (counter > 0) {
      counter -= 1;
      counterTxt.innerText = `${counter}`;
    }
  });

  plusBtn.addEventListener('click', () => {
    counter += 1;
    counterTxt.innerText = `${counter}`;
  });

  function startTimer() {
    const timeToStop = moment().add(counter * 60 + 1, 'seconds');
    counterTxt.innerText = showProperTime(counter * 60);

    toggleElements([minusBtn, plusBtn, startBtn]);

    const id: number = setInterval(() => {
      const timer: number = moment().diff(timeToStop, 'seconds') * -1;

      counterTxt.innerText = showProperTime(timer);
      if (timer <= 0) {
        clearInterval(id);
        counterTxt.innerText = `${counter}`;
        toggleElements([minusBtn, plusBtn, startBtn]);
      }
    }, 1000);
  }

  startBtn.addEventListener('click', () => {
    if (counter > 0) {
      startTimer();
    }
  });
}

/**
 * This function creates a set of HTML elements forming a timer. Also applies styles.
 * @param parent HTML element where to place timer
 */
function createTimer(parent: HTMLElement | null) {
  const timerTitle: HTMLElement = document.createElement('h2');

  timerTitle.innerText = 'Timer';
  parent?.appendChild(timerTitle);

  const timerText: HTMLElement = document.createElement('p');
  timerText.innerText = 'Укажите время в минутах';
  parent?.appendChild(timerText);

  const interfaceBox: HTMLElement = document.createElement('div');
  interfaceBox.style.display = 'flex';
  interfaceBox.style.justifyContent = 'center';
  interfaceBox.style.alignItems = 'center';
  interfaceBox.style.margin = '15px 0';
  parent?.appendChild(interfaceBox);

  const minusBtn: HTMLElement = document.createElement('button');
  setButtonStyles(minusBtn, '20px', '8px', '0 50px', 'grey', 'none', 'pointer');
  minusBtn.innerText = '-';
  interfaceBox.appendChild(minusBtn);

  const counterText: HTMLElement = document.createElement('span');
  interfaceBox.appendChild(counterText);

  const plusBtn: HTMLElement = document.createElement('button');
  setButtonStyles(plusBtn, '20px', '8px', '0 50px', 'grey', 'none', 'pointer');
  plusBtn.innerText = '+';
  interfaceBox.appendChild(plusBtn);

  const startBtn: HTMLElement = document.createElement('button');
  setButtonStyles(startBtn, '40px', '16px', '0', 'green', 'none', 'pointer');
  startBtn.innerText = 'Start';
  parent?.appendChild(startBtn);

  addEvents(minusBtn, plusBtn, counterText, startBtn);
}

createTimer(timerBox);
