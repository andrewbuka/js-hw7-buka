const screenValue = document.querySelector('.screen-input');
const buttons = document.querySelectorAll('.button');

let count = [];
let num1;
let num1Transform;
let num2;
let operator;
let a;

onButtonClick();
onKeyboardButton();

function onKeyboardButton() {
  document.body.addEventListener('keydown', (event) => {
    a = event.key;

    if (operator === '=') {
      operator = 'Enter';
    }

     if (event.key === '.') {
      a = ',';
    }

    if (a) {
      screenValue.focus();
    }

    deleteText();
    
    if (!isNaN(a)) {
      count.push(a);
    }

    onDeleteButton();

    //screen filter
    if (isNaN(a) && a !== ',' && a !== '.') {   
      event.preventDefault();
    }

    // take button
    if (num1 && operator && num2 && a !== '%' && a !== '+/-' ) {
      screenValue.value = '';
      num2 = screenValue.value;
    }

    // operation with persentages
    if (a === '%') {
      if (num1 && !num2) {
        num2 = screenValue.value;
        if (operator === '+') {
          addOperation();
          return;
        } else if (operator === '-') {
          subtractOperation();
          return;
        } else if (operator === '*') {
          operator = 'x';
          multiplyOperation();
          return;
        } else if (operator === '/') {
          divideOperation();
          return;
        } else {
          return;
        }
      }
    }

    //null if `=`
    nullAfterEquil();
    

    //  nullAfterEquil
    function nullAfterEquil() {
      if (operator === 'Enter' && !isNaN(a)) {
        screenValue.value = '';
        num1 = '';
        num2 = '';
        operator = '';
      }
    }

    // `0,` if `,`
    if (a === ',' && screenValue.value === '') {
      if (operator === 'Enter') {
        num1 = '';
        num2 = '';
        operator = '';
        screenValue.value = '0';
        return;
      }
      else {
        screenValue.value = '';
        screenValue.value = '0';
        return;
      }
    }

    // isCommaInNumbers
    if (screenValue.value.includes('.')  || screenValue.value.includes(',')) {
      if (a === ',') {
        event.preventDefault();
      }
    }

    // if not a number
    if (isNaN(a) && a !== ',') {
      if (!num1) {
        num1 = screenValue.value;
        screenValue.value = '';
      } else {
        num2 = screenValue.value;
        screenValue.value = '';
      }
      num1Transform = num1;
      if (num1Transform.toString().includes('.')) {
        num1Transform = num1Transform.toString().replace('.', ',');
      }
      screenValue.setAttribute('placeholder', `${num1Transform}`);

      // calculation
      if (num1 && num2) {
        num1TransformCommaToDot();
        num2TransformCommaToDot();

        if (operator === '+') {
          calculateAdd();
        } else if (operator === '-') {
            calculateSubtract();
          } else if (operator === '/') {
              if (num2 === '0') {
                a = 'Delete';
                onDeleteButton();
                screenValue.value = 'wrong operation';
                return;
              }
              calculateDivide();
            } else if (operator === '*') {
                operator = 'x';
                calculateMultiply();
              }
      }

      // operator values
      if (a === '+' || a === '-' || a === '/' || a === 'x' || a === 'Enter' || a === '%' || a === '=') {
        operator = a;
      }

      operator = a;

      if (operator === 'Enter') {
        operator = '=';
      }
    }
  });
}

function onButtonClick() {
  [...buttons].forEach(button => {
    button.addEventListener('click', (event) => {
      a = event.target.textContent;

      if (operator === 'Enter') {
        operator = '=';
      }

      deleteText();

      if (!isNaN(a)) {
        count.push(a);
      }

      onAcButtonClick();

      if (isNaN(a) && !count.length && a !== ',') {
        skipOperator();
        return;
      }

      // take a button
      if (num1 && operator && num2 && a !== '%' && a !== '+/-') {
        screenValue.value = '';
        num2 = screenValue.value;
      }

      // operation with persentages
      if (a === '%') {
        if (num1 && !num2) {
          num2 = screenValue.value;
          if (operator === '+') {
            addOperation();
            return;
          } else if (operator === '-') {
              subtractOperation();
              return;
            } else if (operator === 'x') {
                multiplyOperation();
                return;
              } else if (operator === '/') {
                  divideOperation();
                  return;
                } else {
                    return;
                  }
        }
      }

      // operation with plus/minus
      if (a === '+/-') {
        if (num1 && !num2) {
          changeSignBefore();
          return;
        }

        changeSignBefore();
        
        num1 = screenValue.value;
        return;
      }

      //  null after persentages if `,`
      commaAfterPercetages();

      //null if `=`
      nullAfterEquil();

      // if a number
      if (!isNaN(a)) {
        screenValue.value += a;
      }

      isCommaInNumbers();

      // `0,` `,`     
      if (a === ',' && screenValue.value === ',') {
        if (operator === '=') {
          num1 = '';
          num2 = '';
          operator = '';
          screenValue.value = '0,';
          return;
        } else {
            screenValue.value = '0,';
            return;
          }
      }

      // if not a number 
      if (isNaN(a) && a !== ',') {
        if (!num1) {
          num1 = screenValue.value;
          screenValue.value = '';
        } else {
            num2 = screenValue.value;
            screenValue.value = ''
          }

        num1Transform = num1;

        if (num1Transform.toString().includes('.')) {
          num1Transform = num1Transform.toString().replace('.', ',');
        }

        screenValue.setAttribute('placeholder', `${num1Transform}`);

        // calculation
        if (num1 && num2) {
          num1TransformCommaToDot();
          num2TransformCommaToDot();

          if (operator === '+') {
            calculateAdd();
          } else if (operator === '-') {
              calculateSubtract();
            } else if (operator === '/') {
                if (num2 === '0') {
                  a = 'AC';
                  onAcButtonClick();
                  screenValue.value = 'wrong operation';
                  return;
                }
                calculateDivide();
              } else if (operator === 'x') {
                  calculateMultiply();
                }
        }

        operator = a;
        if (operator === '=') {
          operator = 'Enter'
        }
      }
    });
  });
} 
