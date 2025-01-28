// Активация всех кнопок
document.getElementsByClassName('button')[0].addEventListener('click', ()=> {
    document.getElementsByClassName('products')[0].scrollIntoView({ behavior: "smooth" });
});
const links = document.querySelectorAll('.menu-item > a');
for (let i = 0; i < links.length; i++) {
    links[i].addEventListener('click', ()=>) {
        document.getElementsByClassName(links[i].getAttribute('data-link'))[0].scrollIntoView({ behavior: "smooth" });
    };
};
const buttons = document.querySelectorAll('.products-item .button');
for (let i = 0; i <buttons.length; i++) {
    buttons[i].onclick = function () {
        document.getElementsByClassName('form__order')[0].scrollIntoView({behavior: "smooth"});
    };
};