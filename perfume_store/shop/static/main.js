document.addEventListener("DOMContentLoaded", function() {
    const apiUrl = '/api/products'; // Замените на реальный URL вашего API
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
                        <p class="product-price">3мл 250₽ /60 мл 2500 ₽</p>
                        <button class="add-to-cart-button" data-product-id="${product.id}">Добавить в корзину</button>
                    `;
                    productContainer.appendChild(productCard);
                });

                // Добавляем обработчик событий для кнопок "Добавить в корзину"
                const addToCartButtons = document.querySelectorAll('.add-to-cart-button');
                addToCartButtons.forEach(button => {
                    button.addEventListener('click', function() {
                        // Исправлено: правильное имя атрибута 'data-product-id'
                        const productId = this.getAttribute('data-product-id'); 
                        const product = data.find(p => p.id == productId); // Находим продукт по ID

                        // Проверяем, найден ли продукт
                        if (product) {
                            // Добавляем продукт в корзину
                            addToCart(product);
                        } else {
                            console.error('Продукт не найден');
                        }
                    });
                });
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
            productContainer.innerHTML = '<p>Произошла ошибка при загрузке продуктов.</p>';
        });

    // Функция для добавления товара в корзину
    function addToCart(product) { // Изменено имя параметра с products на product
        let cart = JSON.parse(localStorage.getItem('cart')) || []; // Получаем корзину из localStorage или создаем новую

        // Проверяем, есть ли уже этот продукт в корзине
        const existingProductIndex = cart.findIndex(item => item.id === product.id);
        if (existingProductIndex > -1) {
            // Если продукт уже есть, увеличиваем количество
            cart[existingProductIndex].quantity += 1;
        } else {
            // Если продукта нет, добавляем его в корзину с количеством 1
            cart.push({ ...product, quantity: 1 });
        }

        // Сохраняем обновленную корзину в localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${product.name} добавлен в корзину!`); // Уведомление о добавлении
    }
});