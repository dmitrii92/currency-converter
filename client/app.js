let rates = {};
let baseCurrency = "USD";

function fetchRates() {
  fetch("http://localhost:3000/rates")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return response.json().then((err) => Promise.reject(err));
      }
    })
    .then((data) => {
      console.log(`data = ${JSON.stringify(data)}`);
      if (data.success) {
        rates = data.rates;
        if (data.timestamp) {
          displayTimestamp(data.timestamp);
        }

        populateCurrencySelection();
        convertCurrency(1);

      } else {
        return Promise.reject(data.error.info);
      }
    })
    .catch((error) => {
      console.log(`error = ${error}`);
      document.getElementById("error").innerText = `An error occurred: ${
        error || "Unknown error"
      }`;
    });
}

function populateCurrencySelection() {
  const fromCurrencySelect = document.getElementById("fromCurrency");
  const toCurrencySelect = document.getElementById("toCurrency");

  for (const currency in rates) {
    const option = document.createElement("option");
    option.value = currency;
    option.innerText = currency;
    fromCurrencySelect.appendChild(option.cloneNode(true));
    toCurrencySelect.appendChild(option);
  }

  fromCurrencySelect.value = "USD";
  toCurrencySelect.value = "EUR";
}

function switchCurrencies() {
  const fromCurrency = document.getElementById("fromCurrency");
  const toCurrency = document.getElementById("toCurrency");
  const temp = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = temp;
  convertCurrency(1);
}

function convertCurrency(inputFieldNumber) {
  const fromCurrency = document.getElementById('fromCurrency').value;
  const toCurrency = document.getElementById('toCurrency').value;
  const amount1 = document.getElementById('amount1').value;
  const amount2 = document.getElementById('amount2').value;
  const rate = rates[toCurrency] / rates[fromCurrency];

  if (inputFieldNumber === 1) {
    const result = (amount1 * rate).toFixed(2);
    document.getElementById('amount2').value = result;
    document.getElementById('conversionDescription').innerText = `${amount1} ${fromCurrency} equals`;
    document.getElementById('conversionValue').innerText = `${result} ${toCurrency}`;
  } else {
    const result = (amount2 / rate).toFixed(2);
    document.getElementById('amount1').value = result;
    document.getElementById('conversionDescription').innerText = `${result} ${fromCurrency} equals`;
    document.getElementById('conversionValue').innerText = `${amount2} ${toCurrency}`;
  }
  
}

function displayTimestamp(timestamp) {
  const date = new Date(timestamp * 1000);
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
  const formattedDate = date.toLocaleDateString(undefined, options);
  document.getElementById('timestamp').innerText = `${formattedDate}`;
}

fetchRates();
