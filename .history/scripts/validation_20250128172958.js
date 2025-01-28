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