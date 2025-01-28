// Глобальные переменные для текущей валюты и коэффициента
let currentCurrency = "$";
let currentCoefficient = 1;

// Изменение валюты
document.getElementById('change-currency').addEventListener('click', change_currency);
function change_currency(e) {
    currentCurrency = e.target.innerText;
    if (currentCurrency === "$") {
        currentCurrency = "₽";
        currentCoefficient = 90;
    } else if (currentCurrency === "₽") {
        currentCurrency = "UZS";
        currentCoefficient = 12600;
    } else if (currentCurrency === "UZS") {
        currentCurrency = "€";
        currentCoefficient = 0.9;
    } else if (currentCurrency === "€") {
        currentCurrency = "CN¥";
        currentCoefficient = 7.3;
    } else if (currentCurrency === "CN¥") {
        currentCurrency = "£";
        currentCoefficient = 0.78;
    } else if (currentCurrency === "£") {
        currentCurrency = "DH";
        currentCoefficient = 3.67;
    } else {
        currentCurrency = "$";
        currentCoefficient = 1;
    }
    e.target.innerText = currentCurrency;
    updatePrices();
}

// Функция для обновления цен на карточках
function updatePrices() {
    const prices = document.getElementsByClassName('products-item-price');
    for (let i = 0; i < prices.length; i++) {
        const basePrice = parseFloat(prices[i].getAttribute('data-base-price'));
        prices[i].innerText = `${(basePrice * currentCoefficient).toFixed(1)} ${currentCurrency}`;
    }
}

// Перерисовка карточек с учетом текущей валюты
function renderCookies(products) {
    const productContainer = document.querySelector(".products-items");
    productContainer.innerHTML = "";
    products.forEach((cookies) => {
        const productItem = document.createElement("article");
        productItem.classList.add("products-item");

        productItem.innerHTML = `
            <div class="image-wrapper"><img src="${cookies.image}" alt="${cookies.alt}"></div>
            <div class="products-item-details">
                <h4>${cookies.title}</h4>
                <p>${cookies.text}</p>
                <div class="products-item-extra">
                    <div class="products-item-info" data-sugar-free="${cookies.sugar}">
                        <div class="products-item-price" data-base-price="${cookies.price}">
                            ${(cookies.price * currentCoefficient).toFixed(1)} ${currentCurrency}
                        </div>
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
}

// Фильтрация по наличию сахара
function switchSugarFree(products) {
    const switchInput = document.querySelector("#switch");

    switchInput.addEventListener('change', () => {
        const filteredCookies = switchInput.checked
            ? products.filter(product => product.sugar === "sugar-free")
            : products;

        renderCookies(filteredCookies);
    });
}

// Подстановка выбранного печенья в поле формы
function fillInSelectedCookie() {
    const orderButtons = document.querySelectorAll(".products-item button");
    const inputCookie = document.querySelector("#product");

    orderButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            const productItem = event.target.closest(".products-item");
            const cookieTitle = productItem.querySelector(".products-item-details h4").textContent;
            const cookiePrice = productItem.querySelector(".products-item-price").textContent;

            if (inputCookie && productItem) {
                inputCookie.value = `${cookieTitle} - ${cookiePrice}`;
                inputCookie.readOnly = true;
                document.querySelector(".form__order h2").scrollIntoView({ behavior: "smooth" });
            }
        });
    });
}

// Инициализация
document.addEventListener("DOMContentLoaded", () => {
    renderCookies(products);
    switchSugarFree(products);
    fillInSelectedCookie();
});
