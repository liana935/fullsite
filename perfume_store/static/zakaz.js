document.addEventListener('DOMContentLoaded', () => {
    const orderForm = document.querySelector('form');

    orderForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Получаем корзину из localStorage
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        if (cart.length === 0) {
            alert('Корзина пуста');
            return;
        }

        const formData = new FormData(orderForm);
        const orderData = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone_number: formData.get('phone'),
            delivery_address: formData.get('address'),
            items: cart.map(item => ({
                product_id: item.id,
                quantity: item.quantity
            }))
        };

        try {
            // Отправляем заказ на сервер
            const xhr = new XMLHttpRequest();
            xhr.open('POST', '/api/orders', true);
            xhr.setRequestHeader('Content-Type', 'application/json');

            xhr.onload = function() {
                if (xhr.status === 201) {
                    // Очищаем корзину после успешного заказа
                    localStorage.removeItem('cart');
                    alert('Заказ успешно оформлен!');
                    window.location.href = 'yspex.html';
                } else {
                    throw new Error('Ошибка отправки заказа');
                }
            };

            xhr.send(JSON.stringify(orderData));

        } catch (error) {
            console.error('Ошибка:', error);
            alert('Произошла ошибка. Попробуйте еще раз.');
        }
    });
});