// Фильтрация по наличию сахара
function switchSugarFree() {
    const switchInput = document.querySelector("#switch"); // Получаем сам чекбокс

    switchInput.addEventListener('change', ()=>{
        const filteredCookies = switchInput.checked
        ? products.filter(product => product.sugar === "sugar-free")
        : products;
        
        renderCookies(filteredCookies);
    });
};
document.addEventListener("DOMContentLoaded", ()=>{
    switchSugarFree();
});