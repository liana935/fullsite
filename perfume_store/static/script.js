// Массив для хранения товаров в корзине
let cart = [];

function fetchData() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/products/', true);
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
    const contentContainer = document.getElementById('content'); // Предполагается, что у вас есть элемент с id="content"
    contentContainer.innerHTML = ''; // Очищаем контейнер перед добавлением новых элементов

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card'; // Применяем класс для стилизации

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
            <button class="add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">Добавить в корзину</button>
        `;

        contentContainer.appendChild(productCard); // Добавляем элемент в контейнер
    });
}
let cartId = 1;
// Функция для добавления товара в корзину
function addToCart(product) {
    // Получаем текущую корзину из localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Проверяем, есть ли уже такой товар в корзине
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingProductIndex > -1) {
        // Если товар уже есть, увеличиваем количество
        cart[existingProductIndex].quantity += 1;
    } else {
        // Если товара нет, добавляем новый
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }
    
    // Сохраняем обновленную корзину в localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Обновляем отображение корзины
    updateCartDisplay();
}

// Вызов функции для получения данных
fetchData();