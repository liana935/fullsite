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
            productContainer.innerHTML = '';

            if (data.length === 0) {
                productContainer.innerHTML = '<p>Нет доступных продуктов.</p>';
            } else {
                data.forEach(product => {
                    const productCard = document.createElement('div');
                    productCard.classList.add('product-card', 'bg-white', 'border', 'border-pink-500', 'rounded-lg', 'shadow-lg', 'p-4', 'm-2', 'cursor-pointer');
                    productCard.innerHTML = `
                        <img src="${product.photo_url}" alt="${product.name}" class="product-image rounded-lg mb-2">
                        <h2 class="product-name text-lg font-bold mb-1">${product.name}</h2>
                        <button class="add-to-cart-button bg-pink-500 text-white rounded px-4 py-2">Добавить в корзину</button>
                    `;
                    productContainer.appendChild(productCard);

                    // Добавляем обработчик события для alert
                    productCard.addEventListener('click', function() {
                        alert(`
                            Название: ${product.name}
                            Бренд: ${product.brand}
                            Пол: ${product.gender}
                            Группа: ${product.group_name}
                            Ноты: ${product.notes}
                            Описание: ${product.description}
                        `);
                    });
                });
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
            productContainer.innerHTML = '<p>Произошла ошибка при загрузке продуктов.</p>';
        });
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
