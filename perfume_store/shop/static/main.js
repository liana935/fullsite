document.addEventListener("DOMContentLoaded", function() {
    const apiUrl = '/api/products'; // Замените на реальный URL вашего API
    const productContainer = document.querySelector('.product-container');
    const productModal = document.getElementById('product-modal');
    const closeModalButton = document.getElementById('close-modal');
    const addToCartButton = document.getElementById('add-to-cart');

    // Получаем корзину из localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

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
                        <img src="${product.photo_url}" alt="${product.name}" class="product-image rounded-lg mb-2 w-full h-auto">
                        <h2 class="product-name text-lg font-bold mb-1">${product.name}</h2>
                    `;
                    productContainer.appendChild(productCard);

                    // Добавляем обработчик события для открытия модального окна
                    productCard.addEventListener('click', function() {
                        document.getElementById('modal-product-image').src = product.photo_url; // Устанавливаем изображение
                        document.getElementById('modal-product-name').innerText = product.name;
                        document.getElementById('modal-product-brand').innerText = `Бренд: ${product.brand}`;
                        document.getElementById('modal-product-gender').innerText = `Пол: ${product.gender}`;
                        document.getElementById('modal-product-group').innerText = `Группа: ${product.group_name}`;
                        document.getElementById('modal-product-notes').innerText = `Ноты: ${product.notes}`;
                        document.getElementById('modal-product-description').innerText = `Описание: ${product.description}`;
                        
                        productModal.classList.remove('hidden'); // Показываем модальное окно
                    });
                });
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
 productContainer.innerHTML = '<p>Произошла ошибка при загрузке продуктов.</p>';
        });

    // Закрытие модального окна
    closeModalButton.addEventListener('click', function() {
        productModal.classList.add('hidden'); // Скрываем модальное окно
    });

    // Закрытие модального окна при клике вне его
    productModal.addEventListener('click', function(event) {
        if (event.target === productModal) {
            productModal.classList.add('hidden'); // Скрываем модальное окно
        }
    });

    // Обработчик события для добавления товара в корзину
    addToCartButton.addEventListener('click', function() {
        const productName = document.getElementById('modal-product-name').innerText;
        const productImage = document.getElementById('modal-product-image').src;

        // Добавляем товар в корзину
        cart.push({ name: productName, image: productImage });
        localStorage.setItem('cart', JSON.stringify(cart)); // Сохраняем корзину в localStorage

        alert('Товар добавлен в корзину: ' + productName);
    });
});