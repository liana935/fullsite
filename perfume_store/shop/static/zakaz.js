document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('orderForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Предотвращаем отправку формы

        // Получаем данные из формы
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        const address = document.getElementById('address').value.trim();

        // Проверяем, что все поля заполнены
        if (!name || !phone || !email || !address) {
            document.getElementById('message').innerText = 'Пожалуйста, заполните все поля.';
            document.getElementById('message').classList.remove('hidden');
            return;
        }

        // Извлекаем данные корзины из LocalStorage
        const cart = JSON.parse(localStorage.getItem('cart')) || []; // Получаем корзину

        // Проверяем, есть ли товары в корзине
        if (cart.length === 0) {
            document.getElementById('message').innerText = 'Корзина пуста. Добавьте товары перед оформлением заказа.';
            document.getElementById('message').classList.remove('hidden');
            return;
        }

        // Создаем объект заказа
        const order = {
            name: name,
            phone_number: phone,
            email: email,
            delivery_address: address,
            cart_items: cart.map(item => ({
                id: item.id,
                name: item.name,
                quantity: item.quantity // Это теперь объем в мл
            }))
        };

        // Отправляем данные заказа на сервер
        fetch('/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken') // Добавляем CSRF-токен для безопасности
            },
            body: JSON.stringify(order),
        })
        .then(response => {
            if (response.ok) {
                document.getElementById('message').innerText = 'Заказ успешно оформлен!';
                document.getElementById('message').classList.remove('hidden');
                clearCart(); // Очистка корзины после успешного оформления
                window.location.href = 'yspex'; // Перенаправление на страницу
            } else {
                return response.json().then(errorData => {
                    throw new Error(errorData.message || 'Ошибка оформления заказа');
                });
            }
        })
        .catch(error => {
            document.getElementById('message').innerText = error.message;
            document.getElementById('message').classList.remove('hidden');
        });
    });

    // Функция для очистки корзины
    function clearCart() {
        localStorage.removeItem('cart'); // Очищаем данные корзины из LocalStorage
        console.log('Корзина очищена');
    }

    // Функция для получения CSRF-токена
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});