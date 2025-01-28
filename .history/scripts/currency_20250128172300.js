// Подключение смены валюты
const prices = document.getElementsByClassName('products-item-price');
document.getElementById('change-currency').addEventListener('click', change_currency)
function change_currency(e) {
    const currentCurrency  = e.target.innerText;
    let newCurrency = "$";
    let coefficient = 1;

    if (currentCurrency === "$") {
        newCurrency = "₽"; // российский рубль
        coefficient = 90;
    }
    else if (currentCurrency === "₽") {
        newCurrency = "UZS";
        coefficient = 12600; // узбекский сум
    }
    else if (currentCurrency === "UZS") {
        newCurrency = "€"; // евро
        coefficient = 0.9;
    } else if (currentCurrency === "€") {
        newCurrency = "CN¥"; // китайский юань
        coefficient = 7.3; // актуальный курс
    }
    else if (currentCurrency === "CN¥") {
        newCurrency = "£"; // британский фунт стерлингов
        coefficient = 0.78;
    }
    else if (currentCurrency === "£") {
        newCurrency = "DH"; // дирхам ОАЭ
        coefficient = 3.67;
    }
    e.target.innerText = newCurrency;
     for (let i = 0; i < prices.length; i++) {
        prices[i].innerText = +(prices[i].getAttribute('data-base-price') * coefficient).toFixed(1) + " " + newCurrency
     }
};