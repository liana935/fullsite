document.addEventListener("DOMContentLoaded", function() {
    const apiUrl = '/api/products'; // Замените на реальный URL вашего API
    const productContainer = document.querySelector('.product-container');
    const productModal = document.getElementById('product-modal');
    const closeModalButton = document.getElementById('close-modal');
    const addToCartButton = document.getElementById('add-to-cart');

    // Получаем корзину из localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let selectedQuantity = null; // Переменная для хранения выбранного объема

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
                        
                        // Сбрасываем выбранный объем
                        selectedQuantity = null;

                        // Удаляем активный класс с кнопок объема
                        document.querySelectorAll('.volume-button').forEach(btn => btn.classList.remove('active'));

                        // Сохраняем продукт в переменной модального окна
                        addToCartButton.dataset.product = JSON.stringify(product);
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

    // Обработчик события для кнопок объема
    document.querySelectorAll('.volume-button').forEach(button => {
        button.addEventListener('click', function() {
            selectedQuantity = this.dataset.volume; // Сохраняем выбранный объем
            // Добавляем класс активной кнопке (для стилизации)
            document.querySelectorAll('.volume-button').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Обработчик события для добавления товара в корзину
    addToCartButton.addEventListener('click', function() {
        if (!selectedQuantity) {
            alert('Пожалуйста, выберите объем товара.');
            return;
        }

        const productData = JSON.parse(this.dataset .product);
        const cartItem = {
            ...productData,
            quantity: selectedQuantity // Используем quantity вместо volume
        };

        cart.push(cartItem);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Товар добавлен в корзину!');
        productModal.classList.add('hidden'); // Скрываем модальное окно
    });
});