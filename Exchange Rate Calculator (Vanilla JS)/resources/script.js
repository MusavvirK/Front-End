const curElemOne = document.getElementById('currency-one');
const amount_one = document.getElementById('amount-one');
const curElemTwo = document.getElementById('currency-two');
const amount_two = document.getElementById('amount-two');

const rateElem = document.getElementById('rate');
const swap = document.getElementById('swap');


function caclulateOne() {
  const currency_one = curElemOne.value;
  const currency_two = curElemTwo.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then(res => res.json())
    .then(data => {
      const rate = data.rates[currency_two];

      rateElem.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

      amount_two.value = (amount_one.value * rate).toFixed(2);
    });
}

function caclulateTwo() {
    const currency_one = curElemOne.value;
    const currency_two = curElemTwo.value;
  
    fetch(`https://api.exchangerate-api.com/v4/latest/${currency_two}`)
      .then(res => res.json())
      .then(data => {
        const rate = data.rates[currency_one];
  
        rateElem.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
  
        amount_one.value = (amount_two.value * rate).toFixed(2);
      });
  }

curElemOne.addEventListener('change', caclulateOne);
amount_one.addEventListener('input', caclulateOne);
curElemTwo.addEventListener('change', caclulateTwo);
amount_two.addEventListener('input', caclulateTwo);

swap.addEventListener('click', () => {
  const temp = curElemOne.value;
  curElemOne.value = curElemTwo.value;
  curElemTwo.value = temp;
  caclulateOne();
});

caclulateOne();