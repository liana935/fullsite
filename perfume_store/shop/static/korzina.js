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
                    <p>Количество: 
                        <button class="decrease-quantity" data-product-id="${item.id}">-</button> 
                        ${item.quantity} 
                        <button class="increase-quantity" data-product-id="${item.id}">+</button>
                    </p>
                    <button class="remove-from-cart-button" data-product-id="${item.id}">Удалить</button>
                `;
                cartItemsContainer.appendChild(cartItem);
            });
        }
    }

    // Функция для добавления товара в корзину
    function addToCart(product) {
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1; // Увеличиваем количество, если товар уже в корзине
        } else {
            cart.push({ ...product, quantity: 1 }); // Добавляем новый товар
        }
        localStorage.setItem('cart', JSON.stringify(cart)); // Сохраняем корзину в localStorage
        updateCartDisplay();
    }

    // Обработчик события для кнопок "Добавить в корзину"
    document.querySelectorAll('.add-to-cart-button').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.dataset.productId;
            const product = products.find(p => p.id == productId); // Находим продукт по ID
            if (product) {
                addToCart(product);
            }
        });
    });

    // Обработчик события для изменения количества товара
    cartItemsContainer.addEventListener('click', function(event) {
        const productId = event.target.dataset.productId;

        if (event.target.classList.contains('increase-quantity')) {
            const existingItem = cart.find(item => item.id == productId);
            if (existingItem) {
                existingItem.quantity += 1; // Увеличиваем количество
                localStorage.setItem('cart', JSON.stringify(cart)); // Сохраняем изменения
                updateCartDisplay();
            }
        } else if (event.target.classList.contains('decrease-quantity')) {
            const existingItem = cart.find(item => item.id == productId);
            if (existingItem) {
                if (existingItem.quantity > 1) {
                    existingItem.quantity -= 1; // Уменьшаем количество, если больше 1
                } else {
                    cart.splice(cart.indexOf(existingItem), 1); // Удаляем товар, если количество 1
                }
                localStorage.setItem('cart', JSON.stringify(cart)); // Сохраняем изменения
                updateCartDisplay();
            }
        } else if (event.target.classList.contains('remove-from-cart-button')) {
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