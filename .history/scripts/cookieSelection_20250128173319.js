// Подстановка выбранного печенья в поле формы для отправки заказа
function fillInSelectedCookie () {
    // Выбираем все кнопки заказа
    const orderButtons = document.querySelectorAll(".products-item button");
    
    const inputCookie = document.querySelector("#product");
    
    orderButtons.forEach((button)=>{
        button.addEventListener('click', (event)=>{
            // Находим карточку, содержащую нажатую кнопку
            const productItem = event.target.closest(".products-item");

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