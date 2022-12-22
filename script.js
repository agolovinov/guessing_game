const numberInputMin = document.querySelector("#minNumberField");
const numberInputMax = document.querySelector("#maxNumberField");
let minValue = numberInputMin.value;
let maxValue = numberInputMax.value;
const minFixedValue = -999;
const maxFixedValue = 999;
let fixedValueMin;
let fixedValueMax;
let answerNumber;

const orderNumberField = document.querySelector('#orderNumberField');
const answerField = document.querySelector('#answerField');
answerField.innerText = "Поиграем \u{1F609}?";

let orderNumber = 1;
let gameRun;

// Ввод чисел с ограничением диапазона от -999 до 999.

function minNumberA() {
    minValue = parseInt(numberInputMin.value);
}

function minNumberB() {
    if (minValue < -999) {
        numberInputMin.value = -999;
        minValue = -999; 
    }  else {
        numberInputMin.value = 999;
        minValue = 999;
    }
}

numberInputMin.addEventListener("change", (event) => {
    minValue = event.target.value;
    fixedValueMin = Math.abs(minValue) <= 999 ? minNumberA() : minNumberB() ;
})

function maxNumberA() {
    maxValue = parseInt(numberInputMax.value); 
}

function maxNumberB() {
    if (maxValue < -999) {
        numberInputMax.value = -999;
        maxValue = -999; 
    }  else {
        numberInputMax.value = 999;
        maxValue = 999;
    }
}

// Изначальный вариант перебора ответных реплик. 

/*function replaceValues() {
    const phraseRandom = Math.round(Math.random() * 2);
    if (phraseRandom === 0) {
        const answerPhrase = `Вы перепутали числа местами \u{1F914} !`;
        answerField.innerText = answerPhrase;
        gameRun = false;   
    } else if (phraseRandom === 1) {
        answerPhrase = `Ну кто ж такие числа вводит... \u{1F92F} ?`;
        answerField.innerText = answerPhrase;
        gameRun = false;
    } else { 
        answerField.innerText = `Нажмите "Заново" и поменяйте, пожалуйста, числа местами \u{1F644} .`;
        gameRun = false;
    }
}*/

// Эксперимент со вложенным тернарным оператором (вроде работает...).

function replaceValues() {
const phraseRandom = Math.round(Math.random() * 2);
const phraseNumber = (phraseRandom !== 0) ? (phraseRandom < 2) ? 1 : 2 : 0 ;
    if  (phraseNumber === 0) {
        const answerPhrase = `Ну кто ж такие числа вводит... \u{1F92F} ? Жмите "Заново".`;
        answerField.innerText = answerPhrase;
        gameRun = false;
    } else if (phraseNumber === 1) {
        answerPhrase = `Вы перепутали числа местами \u{1F914} ! "Заново?"`;
        answerField.innerText = answerPhrase;
        gameRun = false;
    } else {
        answerPhrase = `Нажмите "Заново" и поменяйте, пожалуйста, числа местами \u{1F644} .`;
        answerField.innerText = answerPhrase;
        gameRun = false;
    }
}

// Ввод второго числа и проверки чисел на соответствие условиям.
// Если минимальное число больше максимального - предлагается заново ввести "правильные" числа.
// Если оба числа равны 0 или - 0, выводится 0.

let answerNumberPrint;

numberInputMax.addEventListener("change", (event) => {
    maxValue = event.target.value;
    fixedValueMax = Math.abs(maxValue) <= 999 ? maxNumberA() : maxNumberB() ;
    if (minValue > maxValue) {
        replaceValues();
    } else if ((minValue === maxValue) && (answerNumber = ((parseInt(minValue) + parseInt(maxValue)) / 2) === 0)) {
        answerNumberPrint = 0 ;
        orderNumber++;
        orderNumberField.innerText = orderNumber;
        answerField.innerText = `Судя по введённым числам, Вы загадали число ${answerNumberPrint } ?`;
        gameRun = true;   
    } else { 
        answerNumber = Math.floor((parseInt(minValue) + parseInt(maxValue)) / 2);
        orderNumber++;
        orderNumberField.innerText = orderNumber;
        answerField.innerText = `Судя по введённым числам, Вы загадали число ${answerNumberPrint } ?`;
        compare();
    }
})

// Текстовое представление числа - выбор функции для обработки.

let units;
let tens;
let hundreds;
let answerNumberValue;
let str;

function compare() {
const compare = Math.abs(answerNumber) >= 10 && Math.abs(answerNumber) < 20 ? extraValue() : findAnswerNumber();
}

function findAnswerNumber() {
    const b = Math.floor(Math.abs(answerNumber % 10));
    switch (b) {
        case 1:
            units = 'один';
            break;
        case 2:
            units = 'два';
            break;
        case 3:
            units = 'три';
            break;
        case 4:
            units = 'четыре';
            break;
        case 5:
            units = 'пять';
            break;
        case 6:
            units = 'шесть';
            break;
        case 7:
            units = 'семь';
            break;
        case 8:
            units = 'восемь';
            break;
        case 9:
            units = 'девять';
            break;
        default:
            units = '';
    }

    const c = Math.floor((Math.abs(answerNumber) % 100) / 10);
    switch (c) {
        case 1:
            tens = '';
            break;
        case 2:
            tens = 'двадцать ';
            break;
        case 3:
            tens = 'тридцать ';
            break;
        case 4:
            tens = 'сорок ';
            break;
        case 5:
            tens = 'пятьдесят ';
            break;
        case 6:
            tens = 'шестьдесят ';
            break;
        case 7:
            tens = 'семьдесят ';
            break;
        case 8:
            tens = 'восемьдесят ';
            break;
        case 9:
            tens = 'девяносто ';
            break;
        default:
            tens = '';
    } 

    const d = Math.floor(Math.abs(answerNumber) / 100);
    switch (d) {
        case 1:
            hundreds = 'сто ';
            break;
        case 2:
            hundreds = 'двести ';
            break;
        case 3:
            hundreds = 'триста ';
            break;
        case 4:
            hundreds = 'четыресто ';
            break;
        case 5:
            hundreds = 'пятьсот ';
            break;
        case 6:
            hundreds = 'шестьсот ';
            break;
        case 7:
            hundreds = 'семьсот ';
            break;
        case 8:
            hundreds = 'восемьсот ';
            break;
        case 9:
            hundreds = 'девятьсот ';
            break;
        default:
            hundreds = '';
    }

    const answerNumberValue = hundreds + tens + units;

        if (answerNumber < 0) {
            answerNumberPrint = 'минус ' + answerNumberValue;
        } else if (answerNumber > 0) {
            answerNumberPrint = answerNumberValue;
        } else {
            answerNumberPrint = 0;
        }

        if (str = answerNumberPrint.length <= 20) {
            answerNumberPrint = answerNumberPrint;
        } else {
            answerNumberPrint = answerNumber;
        }

    start();
    
}

// Отдельная функция для обработки чисел от -10 до -19 и от 10 до 19.

let extraTens;

function extraValue() {
    const e = Math.abs(answerNumber);
    switch (e) {
        case 10:
            extraTens = 'десять';
            break;    
        case 11:
            extraTens = 'одиннадцать';
            break;
        case 12:
            extraTens = 'двенадцать';
            break;
        case 13:
            extraTens = 'тринадцать';
            break;
        case 14:
            extraTens = 'четырнадцать';
            break;
        case 15:
            extraTens = 'пятнадцать';
            break;
        case 16:
            extraTens = 'шестнадцать';
            break;
        case 17:
            extraTens = 'семнадцать';
            break;
        case 18:
            extraTens = 'восемнадцать';
            break;
        case 19:
            extraTens = 'девятнадцать';
            break;
        default:
            extraTens = '';
    }

        if (answerNumber < 0) {
            answerNumberPrint = 'минус ' + extraTens;
        } else {
            answerNumberPrint = extraTens;
        }
    start();
}

function start() {
    if (answerNumber === "") {
       answerNumber = "Поиграем {1F609}";
    } else {
        answerNumber = Math.floor((minValue + maxValue) / 2);
        gameRun = true;
        answerField.innerText = `Сдаётся мне, что Вы загадали число ${answerNumberPrint } ?`;
    }
}

// Кнопка "Заново".

document.querySelector('#btnRetry').addEventListener('click', function() {
    numberInputMin.value = "";
    numberInputMax.value = "";
    orderNumber = 1;
    answerNumber = "";
    orderNumberField.innerText = orderNumber;
    answerField.innerText = "Поиграем \u{1F609}?";
    gameRun = true;
    start();
})

// Кнопка "Больше".  !!! Внесены изменения - кажется заработала как нужно !!!

document.querySelector('#btnOver').addEventListener('click', function () {
    if (gameRun){
        if (minValue === maxValue){
            gameRun = false;
        } else {   
            minValue = answerNumber + 1;
            answerNumber = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            compare();
            const phraseRandom = Math.round(Math.random() * 2);
            if (phraseRandom === 0) {
                answerField.innerText = `Это было проще простого - Вы загадали число ${answerNumberPrint } ?`;  
            } else if (phraseRandom === 1) {
                answerField.innerText = `Тогда я думаю что это число ${answerNumberPrint } ?`;
            } else { 
                answerField.innerText = `Что же это за число такое? Неужели ${answerNumberPrint } ?`;
            }
        }
        
    }
})

// Кнопка "Меньше".  !!! Внесены изменения. Кажется работает !!!

document.querySelector('#btnLess').addEventListener('click', function () {
    if (gameRun){
        if ((maxValue === minValue) || Math.floor((minValue + maxValue) / 2) <= numberInputMin.value) {
            gameRun = false;
        } else {
            maxValue = answerNumber - 1;
            answerNumber = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            compare();
            const phraseRandom = Math.round(Math.random() * 2);
            const phraseNumber = (phraseRandom !== 0) ? (phraseRandom < 2) ? 1 : 2 : 0 ;
            if (phraseNumber === 0) {
                const answerPhrase = `Это было проще простого - Вы загадали число ${answerNumberPrint } ?`;
                answerField.innerText = answerPhrase;
            } else if (phraseNumber === 1) {
                answerPhrase = `Может быть это число ${answerNumberPrint } ?`;
                answerField.innerText = answerPhrase;
            } else {
                answerPhrase = `Что же это за число такое? Неужели ${answerNumberPrint } ?`;
                answerField.innerText = answerPhrase;
            }
        }

    }
})

// Кнопка "Верно!".

document.querySelector('#btnEqual').addEventListener('click', function () {
    const phraseRandom = Math.round(Math.random() * 2);
    if (phraseRandom === 0) {
        const answerPhrase = `Вы очень сильный соперник \u{1F64C} !`;
        answerField.innerText = answerPhrase;
        gameRun = false;   
    } else if (phraseRandom === 1) {
        answerPhrase = `Когда-нибудь и Вам повезёт... \u{1F92A} ?`;
        answerField.innerText = answerPhrase;
        gameRun = false;
    } else { 
        answerField.innerText = `Я не всегда угадываю \u{1F925} .`;
        gameRun = false;
    }
})
