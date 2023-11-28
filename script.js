let text = "";
// zmienna od której zależeć będzie, czy można użyć operatora
let operatorInserted = true;
// zmienna od której zależeć będzie, czy można użyć przycisku "+/-" lub "%"
let numberInserted = false;
let minusCounter = 0;
let dotCounter = 1;
let onLeftSide = true;
let textLeft,
  textRight = "";
let operatorPlace = 0;
let numbersBlocked = false; // ta zmienna bedzie uzyta do zablokowania mozliwosci wpisywania liczb po kliknieciu '='

// Funkcja wkładająca wartość klikniętego przycisku do kalkulatora
function insert(x) {
  text = document.querySelector("#display").value;

  // Sprawdzanie co już znajduje się na wyświetlaczu
  for (let i = 0; i < text.length; i++) {
    if (text.charAt(i) == "-") {
      minusCounter++;
    }
    // Blokada na dodanie wiecej niz jednego operatora
    // Aby zapobiec dwóm działaniom na raz, które nie są jeszcze obsługiwane
    // Instrukcja zapobiega też dodaniu minusa po operatorze (kod na taka ewentualność został dodany w funkcji calculate jednak nie działał)
    if (
      text.charAt(i) == "+" ||
      text.charAt(i) == "*" ||
      text.charAt(i) == "/"
    ) {
      operatorInserted = true;
      minusCounter = 2;
    }

    if (
      text.charAt(i + 1) == "+" ||
      text.charAt(i + 1) == "*" ||
      text.charAt(i + 1) == "/" ||
      text.charAt(i + 1) == "-"
    ) {
      onLeftSide = false;
      operatorPlace = i + 1;
    }

    if (onLeftSide == true) textLeft = text.slice(0);
    else textRight = text.slice(operatorPlace + 1);
  }

  // Wczytywany jest operator
  // Zmiana zmiennej operatorInserted by zapobiec dodaniu dwóch operatorów obok siebie np. "5++5"
  // Dodanie minusCounter do if'a by zapobiec dodaniu operatora gdy na wyswietlaczu sa juz dwa minusy np. "-5-5+"
  if (x == "+" || x == "*" || x == "/") {
    if (operatorInserted == false && minusCounter < 2) {
      document.querySelector("#display").value += x;
      operatorInserted = true;
      dotCounter = 1;
      numbersBlocked = false;
    }
    // Wczytywany jest minus
  } else if (x == "-") {
    // instrukcja która pozwala na maksymalnie 2 minusy w działaniu
    if (minusCounter < 2) {
      document.querySelector("#display").value += x;
      minusCounter++;
      numbersBlocked = false;
    }
    // Wczytywana jest kropka
  } else if (x == ".") {
    if (dotCounter < 1) {
      document.querySelector("#display").value += x;
      dotCounter++;
    }
  }

  // Wczytywana jest liczba
  else {
    if (numbersBlocked == false) {
    document.querySelector("#display").value += x;
    operatorInserted = false;
    numberInserted = true;
    if (
      (onLeftSide == true && textLeft.includes(".") == true) ||
      (onLeftSide == false && textRight.includes(".") == true)
    )
      dotCounter = 1;
    else dotCounter = 0;

    if (text.charAt(0) !== "-") minusCounter = 1;
    else minusCounter = 0;
  }
  }
  text = document.querySelector("#display").value;
  console.log(textLeft);
  console.log(textRight);
}

// Słuchacz zdarzeń dla przycisku "clear"
document.querySelector("#clear").addEventListener("click", clear);

// Funkcja do wyczyszczenia wyświetlacza
function clear() {
  document.querySelector("#display").value = "";
  text = "";
  operatorInserted = true;
  numberInserted = false;
  minusCounter = 0;
  dotCounter = 1;
  onLeftSide = true;
  textLeft = "";
  textRight = "";
  numbersBlocked = false; 
}

// Funkcja do zapisania procentów w ułamku dziesiętnym
function percent() {
  if (numberInserted == true) {
    let number = document.querySelector("#display").value;
    result = ~~number / 100;
    document.querySelector("#display").value = result;
  }
}

// Funkcja do wykonania odwrotności liczby wyświetlanej
function inverse() {
  if (numberInserted == true && text.includes('+')  == false && text.includes('-')  == false && text.includes('*')  == false && text.includes('/')  == false) {
    let number = document.querySelector("#display").value;
    result = -~~number;
    document.querySelector("#display").value = result;
  }
}

// Funkcja do obliczenia wyniku na podstawie wyrażenia w wyświetlaczu
function calculate() {
  text = document.querySelector("#display").value;
  let left, right;
  let result = 0;
  numbersBlocked = true;

  // Iterowanie przez tekst, aby znaleźć operator i na jego podstawie wykonać obliczenia
  for (let i = 1; i < text.length; i++) {
    if (text.charAt(i) == "+") {
      left = text.slice(0, i);
      right = text.slice(i + 1, text.length);

      lookForDotL(left);
      lookForDotR(right);

      if (typeof left === "string") left = parseFloat(left);
      else if (typeof right === "string") right = parseFloat(right);

      result = countUp("+", left, right, text);

      operatorInserted = false;
      document.querySelector("#display").value = result;
      text = document.querySelector("#display").value;
    } else if (text.charAt(i) == "-") {
      left = text.slice(0, i);
      right = text.slice(i + 1, text.length);

      lookForDotL(left);
      lookForDotR(right);

      if (typeof left === "string") left = parseFloat(left);
      else if (typeof right === "string") right = parseFloat(right);

      result = countUp("-", left, right, text);

      operatorInserted = false;
      document.querySelector("#display").value = result;
      text = document.querySelector("#display").value;
    } else if (text.charAt(i) == "*") {
      left = text.slice(0, i);
      right = text.slice(i + 1, text.length);

      lookForDotL(left);
      lookForDotR(right);

      if (typeof left === "string") left = parseFloat(left);
      else if (typeof right === "string") right = parseFloat(right);

      result = countUp("*", left, right, text);

      operatorInserted = false;
      document.querySelector("#display").value = result;
      text = document.querySelector("#display").value;
    } else if (text.charAt(i) == "/") {
      left = text.slice(0, i);
      right = text.slice(i + 1, text.length);

      lookForDotL(left);
      lookForDotR(right);

      if (typeof left === "string") left = parseFloat(left);
      else if (typeof right === "string") right = parseFloat(right);

      result = countUp("/", left, right, text);

      operatorInserted = false;
      document.querySelector("#display").value = result;
      text = document.querySelector("#display").value;
    }
  }
}

function lookForDotL(left) {
  let beforeLeftDot, afterLeftDot;
  let z = "1";
  if (left.includes(".") == true) {
    for (j = 0; j < left.length; j++) {
      if (left.charAt(j) == ".") {
        beforeLeftDot = left.slice(0, j);
        afterLeftDot = left.slice(j + 1, left.length);
        // Stworzenie zmiennej 'z', której użyjemy do przekonwertowania zwykłej liczby za kropką
        // Na ułamek dziesiętny np .2 = 0.2 lub .222 = 0.222
        for (l = 0; l < afterLeftDot.length; l++) {
          z += "0";
        }
      }
    }
    beforeLeftDot = Number(beforeLeftDot);
    afterLeftDot = Number(afterLeftDot) / Number(z);
    z = "1";
    if (left.charAt(0) == "-") beforeLeftDot - afterLeftDot;
    else left = beforeLeftDot + afterLeftDot;
  }
  return left;
}

function lookForDotR(right) {
  let beforeRightDot, afterRightDot;
  let z = "1";
  if (right.includes(".") == true) {
    for (k = 0; k < right.length; k++) {
      if (right.charAt(k) == ".") {
        beforeRightDot = right.slice(0, k);
        afterRightDot = right.slice(k + 1, right.length);

        for (m = 0; m < afterRightDot.length; m++) {
          z += "0";
        }
      }
    }
    beforeRightDot = Number(beforeRightDot);
    afterRightDot = Number(afterRightDot) / Number(z);
    z = "1";
    right = beforeRightDot + afterRightDot;
  }
  return right;
}

function countUp(operator, left, right, text) {
  let result;
  switch (operator) {
    case "+":
      if (text.charAt(0) == "-") result = -Number(left) + Number(right);
      result = Number(left) + Number(right);
      // Kod obsługujący wszystkie możliwe przypadki dodawania liczb. Niestety nie działa, więc zostaje
      // dodana tymczasowa blokada minusa po innym operatorze np. "5+-2" nie bedzie możliwe.
      // else if (text.charAt(i+1) == '-') result = left + (-right);
      // else if (text.charAt(0) == '-' && text.charAt(i+1) == '-') result = -(left) + (-right);
      // else
      break;
    case "-":
      if (text.charAt(0) == "-") result = -Number(left) - Number(right);
      result = Number(left) - Number(right);
      break;
    case "*":
      if (text.charAt(0) == "-") result = -Number(left) * Number(right);
      result = Number(left) * Number(right);
      break;
    case "/":
      if (text.charAt(0) == "-") result = -Number(left) / Number(right);
      result = Number(left) / Number(right);
      break;
  }
  result = Math.round(result * 1000) / 1000;
  return result;
}
