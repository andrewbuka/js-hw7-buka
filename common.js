function addOperation() {
  num1TransformCommaToDot();
  num2TransformCommaToDot();
  screenValue.value = Number(num1) + Number(num1) * Number(num2) / 100;
  transformDotToComma();
  num1 = '';
  operator = '%';
}

function subtractOperation() {
  num1TransformCommaToDot();
  num2TransformCommaToDot();
  screenValue.value = Number(num1) - Number(num1) * Number(num2) / 100;
  transformDotToComma();
  num1 = '';
  operator = '%';
}

function multiplyOperation() {
  num1TransformCommaToDot();
  num2TransformCommaToDot();
  screenValue.value = Number(num1) * (Number(num1) * Number(num2) / 100);
  transformDotToComma();
  num1 = '';
  operator = '%';
}

function divideOperation() {
  num1TransformCommaToDot();
  num2TransformCommaToDot();
  screenValue.value = Number(num1) / (Number(num1) * Number(num2) / 100);
  transformDotToComma();
  num1 = '';
  operator = '%';
}

function changeSignBefore() {
  transformCommatoDot();
  screenValue.value = Number(screenValue.value) - Number(screenValue.value) * 2;
  transformDotToComma();
}

function skipOperator() {
  screenValue.value = '';
  num1 = '';
  num2 = '';
  operator = '';
  screenValue.setAttribute('placeholder', '0');
}

function commaAfterPercetages() {
  if (operator === '%' && a === ',') {
    screenValue.value = '';
    num1 = '';
    num2 = '';
    operator = '';
  }
}

function nullAfterEquil() {
  if (operator === '=' && !isNaN(a)) {
    screenValue.value = '';
    num1 = '';
    num2 = '';
    operator = '';
  }
}

function isCommaInNumbers() {
  if (a === ',') {
    if (screenValue.value.includes(',') || screenValue.value.includes('.')) {
      a = '';
      screenValue.value += a;
    }
    screenValue.value += a;
  }
}

function deleteText() {
  if (screenValue.value === 'wrong operation') {
    screenValue.value = '';
  }
}

function onDeleteButton() {
  if (a === 'Delete') {
    screenValue.value = '';
    num1 = '';
    num2 = '';
    operator = '';
    screenValue.setAttribute('placeholder', '0');
    count = [];
    return;
  }
}

function onAcButtonClick() {
  if (a === 'AC') {
    screenValue.value = '';
    num1 = '';
    num2 = '';
    operator = '';
    screenValue.setAttribute('placeholder', '0');
    count = [];
    return;
  }
}

function transformDotToComma() {
  if (screenValue.value.includes('.')) {
    screenValue.value = screenValue.value.replace('.', ',');
  }
}

function transformCommatoDot() {
  if (screenValue.value.includes(',')) {
    screenValue.value = screenValue.value.replace(',', '.');
  }
}

function num1TransformCommaToDot() {
  if (num1.toString().includes(',')) {
    num1 = num1.replace(',', '.');
  }
}

function num2TransformCommaToDot() {
  if (num2.toString().includes(',')) {
    num2 = num2.replace(',', '.');
  }
}

function calculateAdd() {
  screenValue.value = Number(num1) + Number(num2);
  transformDotToComma();
  num1 = Number(num1) + Number(num2);
}

function calculateSubtract() {
  screenValue.value = Number(num1) - Number(num2);
  transformDotToComma();
  num1 = Number(num1) - Number(num2);
}

function calculateDivide() {
  screenValue.value = Number(num1) / Number(num2);
  transformDotToComma();
  num1 = Number(num1) / Number(num2);
}

function calculateMultiply() {
  screenValue.value = Number(num1) * Number(num2);
  transformDotToComma();
  num1 = Number(num1) * Number(num2);
}
