const products = document.querySelectorAll('.product');


if (products) {
    products.forEach(el => {
        const imageSwitchItems = el.querySelectorAll('.image-switch__item');
        const imagePagination = el.querySelector('.image-pagination');

        if (imageSwitchItems.length > 1) {
            imageSwitchItems.forEach((el, index) => {
                el.setAttribute('data-index', index);
                imagePagination.innerHTML += `<li class="image-pagination__item ${index == 0 ?'image-pagination__item--active': ''} data-index="${index}"></li>`;
            })
        }
    })
}