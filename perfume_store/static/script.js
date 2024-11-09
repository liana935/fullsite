// Массив для хранения товаров в корзине
let cart = [];

function fetchData() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/products', true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            const products = JSON.parse(xhr.responseText);
            localStorage.setItem('products', JSON.stringify(products));
            renderProducts(products); // Вызов функции для отрисовки продуктов
        } else {
            console.error('Ошибка:', xhr.statusText);
        }
    };
    xhr.send();
}

function renderProducts(products) {
    const contentContainer = document.getElementById('content');
    contentContainer.innerHTML = ''; // Очищаем контейнер перед добавлением новых элементов

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        // Используем ваш формат для отрисовки
        productCard.innerHTML = `
            <h2>${product.name}</h2>
            <img src="${product.photo_url}" alt="${product.name}">
            <div class="text-left">
                <p>Бренд: <span class="font-semibold">${product.brand}</span></p>
                <p>Пол: <span class="font-semibold">${product.gender}</span></p>
                <p>Группа: <span class="font-semibold">${product.group_name}</span></p>
                <p>Примечания: <span class="font-semibold">${product.notes}</span></p>
                <p>Описание: <span class="font-semibold">${product.description}</span></p>
                <p>Количество: <span class="font-semibold">${product.quantity}</span></p>
            </div>
            <button class="add-to-cart" data-id="${product.id}" data-name="${product.name}">Добавить в корзину</button>
        `;

        contentContainer.appendChild(productCard);
    });
}
function addToCart(product) {
    console.log('Добавление товара в корзину:', product); // Отладочное сообщение
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    const productphoto = 

    if (existingProductIndex > -1) {
        // Если товар уже есть, увеличиваем количество
        cart[existingProductIndex].quantity += 1;
    } else {
        // Если товара нет, добавляем новый
        cart.push({
            name: product.name,
            quantity: 1 // Указываем количество
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart)); // Сохраняем корзину в localStorage
    updateCartDisplay(); // Обновляем отображение корзины
}
function updateCartDisplay() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartDisplayElement = document.getElementById('cart-count'); // Предположим, что у вас есть элемент для отображения количества товаров в корзине
    
    if (cartDisplayElement) {
        cartDisplayElement.textContent = cartCount;
    }
}
let cartId = 1;
// Функция для добавления товара в корзину
document.addEventListener('DOMContentLoaded', () => {
    fetchData(); // Вызываем функцию для получения данных о продуктах

    // Обработчик события для добавления товара в корзину
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('add-to-cart')) {
            const product = {
                id: event.target.dataset.id,
                name: event.target.dataset.name
            };
            addToCart(product); // Вызов функции добавления товара в корзину
        }
    });
});

