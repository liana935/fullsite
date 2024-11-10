document.addEventListener("DOMContentLoaded", function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || []; // Загружаем корзину из localStorage
    const cartItemsContainer = document.getElementById('cart-items');
    const checkoutButton = document.getElementById('checkout-button');

    // Функция для обновления отображения корзины
    function updateCartDisplay() {
        cartItemsContainer.innerHTML = ''; // Очищаем контейнер
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Корзина пуста.</p>';
        } else {
            cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.innerHTML = `
                    <img src="${item.photo_url}" alt="${item.name}" class="cart-item-image" />
                    <h3>${item.name}</h3>
                    <p>Цена: ${item.price} ₽</p>
                    <p>Объем: ${item.volume} мл</p> <!-- Изменено на item.volume -->
                    <button class="remove-from-cart-button" data-product-id="${item.id}">Удалить</button>
                `;
                cartItemsContainer.appendChild(cartItem);
            });
        }
    }

    // Функция для добавления товара в корзину
    function addToCart(product) {
        // Проверяем, есть ли уже этот продукт в корзине
        const existingProductIndex = cart.findIndex(item => item.id === product.id && item.volume === product.volume);
        if (existingProductIndex > -1) {
            // Если продукт уже есть, увеличиваем объем
            cart[existingProductIndex].quantity += parseInt(product.volume); // Увеличиваем объем на выбранный
        } else {
            // Если продукта нет, добавляем его в корзину с объемом
            cart.push({ ...product, quantity: parseInt(product.volume) }); // Сохраняем объем
        }

        // Сохраняем обновленную корзину в localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${product.name} добавлен в корзину!`); // Уведомление о добавлении товара в корзину
    }

    // Обработчик события для кнопок "Добавить в корзину"
    document.querySelectorAll('.add-to-cart-button').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.dataset.productId;
            const productVolume = this.dataset.volume; // Получаем объем
            const product = products.find(p => p.id == productId); // Находим продукт по ID
            if (product) {
                product.volume = productVolume; // Устанавливаем объем
                addToCart(product);
            }
        });
    });

    // Обработчик события для изменения количества товара
    cartItemsContainer.addEventListener('click', function(event) {
        const productId = event.target.dataset.productId;

        if (event.target.classList.contains('remove-from-cart-button')) {
            const index = cart.findIndex(item => item.id == productId);
            if (index > -1) {
                cart.splice(index, 1); // Удаляем товар из корзины
                localStorage.setItem('cart', JSON.stringify(cart)); // Сохраняем изменения
                updateCartDisplay();
            }
        }
    });

    // Обработчик события для оформления заказа
    checkoutButton.addEventListener('click', function() {
        if (cart.length === 0) {
            alert('Ваша корзина пуста. Добавьте товары перед оформлением заказа.');
            return;
        }
        // Перенаправление на страницу оформления заказа
        window.location.href = '/checkout'; // Замените '/checkout' на фактический URL вашей страницы оформления заказа
    });

    // Инициализация отображения корзины при загрузке страницы
    updateCartDisplay();
});