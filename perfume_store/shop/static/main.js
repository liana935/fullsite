document.addEventListener("DOMContentLoaded", function() {
    const apiUrl = 'api/products'; // Замените на реальный URL вашего API
    const productContainer = document.querySelector('.product-container');

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Сеть ответила с ошибкой: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            // Очищаем контейнер перед добавлением новых продуктов
            productContainer.innerHTML = '';

            // Проверяем, есть ли продукты
            if (data.length === 0) {
                productContainer.innerHTML = '<p>Нет доступных продуктов.</p>';
            } else {
                data.forEach(product => {
                    const productCard = document.createElement('div');
                    productCard.classList.add('product-card');
                    productCard.innerHTML = `
                        <img src="${product.photo_url}" alt="${product.name}" class="product-image">
                        <h2 class="product-name">${product.name}</h2>
                        <p class="product-price">${product.price} ₽</p>
                        <button class="add-to-cart-button" data-product-id="${product.id}">Добавить в корзину</button>
                    `;
                    productContainer.appendChild(productCard);
                });
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
            productContainer.innerHTML = '<p>Произошла ошибка при загрузке продуктов.</p>';
        });
});