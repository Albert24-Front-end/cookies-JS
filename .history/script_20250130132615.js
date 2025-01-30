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
        document.getElementsByClassName('form__order')[0].scrollIntoView({behavior: "smooth"});
    }
};

// Подключение смены валюты
let currentCurrency = "$";
let currentCoefficient = 1;
// const prices = document.getElementsByClassName('products-item-price');
document.querySelector('#change-currency').addEventListener('click', (e)=>{
    const currencyOrder = ["$", "₽", "UZS", "€", "CN¥", "£", "DH"];
    const coefficients = [1, 90, 12600, 0.9, 7.3, 0.78, 3.67];

    // Получение индекса текущей валюты
    let currentIndex = currencyOrder.indexOf(currentCurrency);

    // Переход к следующей валюте
    currentIndex = (currentIndex + 1) % currencyOrder.length;

    // Обновление текущей валюты и коэффициента
    currentCurrency = currencyOrder[currentIndex];
    currentCoefficient = coefficients[currentIndex];

    // Обновление текста кнопки
    e.target.innerText = currentCurrency;

    // Обновление цен на карточках
    updatePrices();
});

function updatePrices() {
    const prices = document.querySelectorAll('.products-item-price');
    prices.forEach((priceElement) => {
        const basePrice = parseFloat(priceElement.getAttribute('data-base-price'));
        priceElement.innerText = `${(basePrice * currentCoefficient).toFixed(1)} ${currentCurrency}`;
    });
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
                            <div class="products-item-price"  data-base-price="${cookies.price}">${(cookies.price * currentCoefficient).toFixed(1)} ${currentCurrency}</div>
                            <div class="products-item-weight">${cookies.amount} шт./ ${cookies.weight} гр.</div>
                         </div>
                        <button class="button violet">Заказать</button>
                </div>
            </div>
        `;
        productContainer.appendChild(productItem);
    });
    // Обновляем обработчики для кнопок заказа
    fillInSelectedCookie();
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


// Подстановка выбранного печенья в поле формы для отправки заказа
function fillInSelectedCookie () {
    // Выбираем все кнопки заказа
    const orderButtons = document.querySelectorAll(".products-item button");
    
    const inputCookie = document.querySelector("#product");
    
    orderButtons.forEach((button)=>{
        button.addEventListener('click', (event)=>{
            // Находим карточку, содержащую нажатую кнопку
            const productItem = event.target.closest(".products-item");
            const switchInput = document.querySelector("#switch");

            // Получаем заголовок и цену товара из этой карточки
            const cookieTitle = productItem.querySelector(".products-item-details h4").textContent;
            const cookiePrice = productItem.querySelector(".products-item-price").textContent;
            console.log(cookieTitle,  cookiePrice);

            if(inputCookie && productItem) {
                inputCookie.value = `${cookieTitle} - ${cookiePrice}`; // Шаблонные строки - более читаемое и профессиональное исполнение
                // inputCookie.value = cookieTitle + " " + cookiePrice;  Конкатенация - для простых случаев, неудобна при росте сложности
                // Блокировка пользовательского ввода в поле после выбора печенья
                inputCookie.readOnly = true;
                document.querySelector(".form__order h2").scrollIntoView({behavior: "smooth"});
            } 
        });
    });
};

document.addEventListener("DOMContentLoaded", ()=>{
    renderCookies(products);
    switchSugarFree(products);
    fillInSelectedCookie();
});


