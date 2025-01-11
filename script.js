const form = document.querySelector("form");
const amount = document.querySelector("#amount");
const currency = document.querySelector("#currency");
const footer = document.querySelector("footer");

const description = document.querySelector("#description");
const result = document.querySelector("#result");

const moneyPrice = {
  USD: 6.11,
  EUR: 6.25,
  GBP: 7.45,
};

function convertCurrency(amount, currency) {
  try{
  return amount.value * moneyPrice[currency.value];
  }
  catch(e){
    footer.classList.remove("show-result");
    alert("Error ao converter a moeda")
    console.log(e)
  }
}

function formatCurrencyBRL(value){
  return Number(value).toLocaleString("pt-BR", {style: "currency", currency: "BRL"});
}

function convertTextDescription(description, currency) {
  let symbol ="";
  if(currency.value === "USD"){
    symbol = "$";
  }
  if(currency.value === "EUR"){
    symbol = "€";
  }
  if(currency.value === "GBP"){
    symbol = "£";
  }
  const priceInBRL = formatCurrencyBRL(moneyPrice[currency.value]);
  description.innerText = `${currency.value}${symbol} 1 = R$${priceInBRL}`;
}

amount.addEventListener("input", () => {
  const hasCharactersRegex = /\D+/g;
  amount.value = amount.value.replace(hasCharactersRegex, "");
});

form.onsubmit = (e) => {
  e.preventDefault();
  const convertedAmount = convertCurrency(amount, currency);

  result.innerText = `${formatCurrencyBRL(convertedAmount)} Reais` 

  convertTextDescription(description, currency);

  if (!footer.classList.contains("show-result")) {
    footer.classList.toggle("show-result");
  }
};
