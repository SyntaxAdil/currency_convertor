// variables

const dropDowns = document.querySelectorAll(".dropdowns select");
const fromCurr = document.getElementById("from");
const toCurr = document.getElementById("to");

// for selecting options on the select

dropDowns.forEach((i) => {
  for (let currencyCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerHTML = currencyCode;
    newOption.value = currencyCode;
    if (i.name === "from" && currencyCode === "USD") {
      newOption.selected = true;
    } else if (i.name === "to" && currencyCode === "BDT") {
      newOption.selected = true;
    }
    i.append(newOption);
  }
  i.addEventListener("change", (e) => {
    updateFlag(e.target);
  });
});

// updating flag

function updateFlag(element) {
  let currencyCode = element.value;
  let countryCode = countryList[currencyCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let image = element.parentElement.querySelector("img");
  image.src = newSrc;
}

// cuurency convertion

const convertBtn = document.getElementById("convert-btn");

async function updateExchangeRate() {
  let amountVal = document.getElementById("amount-in").value;
  if (amountVal === "" || amountVal < 1) {
    document.getElementById("amount-in").value = "1";
    amountVal = 1;
  }

  let url = `https://hexarate.paikama.co/api/rates/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}/latest`;
  let res = await fetch(url);
  let data = await res.json();
  let rate = amountVal * data.data.mid;
  const message = document.querySelector(".message");
  message.innerHTML = ` ${amountVal} ${fromCurr.value} = ${rate} ${toCurr.value}`;
}

// click event 
convertBtn.addEventListener("click", (e) => {
  e.preventDefault();
  updateExchangeRate();
});
// load event
window.addEventListener("load", () => {
  updateExchangeRate();
});
// enter key event
window.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    convertBtn.click();
  }
});
