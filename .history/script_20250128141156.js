// Активация всех кнопок
document.getElementsByClassName('button')[0].onclick = function () {
    document.getElementsByClassName('products')[0].scrollIntoView({behavior: "smooth"});
}
const links = document.querySelectorAll('.menu-item > a');
for (let i = 0; i < links.length; i++) {
    links[i].onclick = function () {
        document.getElementsByClassName(links[i].getAttribute('data-link'))[0].scrollIntoView({behavior: "smooth"});
    }
}
const buttons = document.querySelectorAll('.products-item .button');
for (let i = 0; i <buttons.length; i++) {
    buttons[i].onclick = function () {
        document.getElementsByClassName('form_order')[0].scrollIntoView({behavior: "smooth"});
    }
}
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
}
// Валидация запроса
const productField = document.getElementById('product');
const nameField = document.getElementById('name');
const phoneField = document.getElementById('phone');

document.getElementById('order-action').addEventListener('click', ()=>{
    const fields = [productField, nameField, phoneField];
    let hasEmptyFields = false;
    let phoneError = false;
    
    fields.forEach((field) => {
        if (!field.value) {
            field.style.borderColor = "red";
            hasEmptyFields = true;
        } 
        else {field.style.borderColor = "";}
    });

    if (hasEmptyFields) {
        alert("Заполните, пожалуйста, все поля");
        return;
    }

    if(phoneField.value.trim().length < 10) {
        phoneField.style.borderColor = "red";
        phoneError = true;
        alert("В номере телефона должно быть минимум 10 символов");
        return;
    }

    if(!hasEmptyFields || !phoneError) {
        fields.forEach((field) => {field.value = ""});
        alert("Спасибо за заказ! Мы скоро свяжемся с Вами!")
    }
});

// Динамическое отображение карточек с печеньями
import { products } from './products.js';

function renderCookies(products) {
    const productContainer = document.querySelector(".products-items");
    productContainer.innerHTML = "";
    products.forEach((cookies)=>{
        const productItem = document.createElement("article");
        productItem.classList.add("products-item");
        
        productItem.innerHTML = `
            <div class="image-wrapper"><img src="${cookies.image}" alt="${cookies.alt}"></div>
                <div class="products-item-details">
                    <h4>${cookies.title}</h4>
                    <p>${cookies.text}</p>
                    <div class="products-item-extra">
                        <div class="products-item-info" data-sugar-free="${cookies.sugar}">
                            <div class="products-item-price"  data-base-price="${cookies.price}">${cookies.price} $</div>
                            <div class="products-item-weight">${cookies.amount} шт./ ${cookies.weight} гр.</div>
                         </div>
                        <button class="button violet">Заказать</button>
                </div>
            </div>
        `;
        productContainer.appendChild(productItem);
    });
};


// Фильтрация по наличию сахара
function switchSugarFree(products) {
    const switchInput = document.querySelector("#switch"); // Получаем сам чекбокс

    switchInput.addEventListener('change', ()=>{
        const filteredCookies = switchInput.checked
        ? products.filter(product => product.sugar === "sugar-free")
        : products;
        
        renderCookies(filteredCookies);
    });
    
};
document.addEventListener("DOMContentLoaded", ()=>{
    renderCookies(products);
    switchSugarFree(products);
});

// Подстановка выбранного печенья в поле формы для отправки заказа
const orderButton = document.querySelectorAll(".button .violet");
const cookieTitle = document.querySelectorAll(".products-item-details h4");


