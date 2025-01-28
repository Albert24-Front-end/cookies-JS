// Динамическое отображение карточек с печеньями
import { products } from '/scripts/products.js';

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


document.addEventListener("DOMContentLoaded", ()=>{
    renderCookies(products);
});