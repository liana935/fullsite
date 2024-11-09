document.addEventListener('DOMContentLoaded', () => {
    function displayCartItems() {
        const cartContainer = document.getElementById('cart-items');
        cartContainer.innerHTML = '';

        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item'); // Добавляем класс для стилизации
            itemElement.innerHTML = `
                <h2>${item.name}</h2>
                <img src="${item.photo_url}" alt="${item.name}" class="cart-item-image">
                <div>
                    <button class="decrease-quantity" data-id="${item.id}">-</button>
                    <input type="number" class="item-quantity" value="${item.quantity}" min="1" data-id="${item.id}">
                    <button class="increase-quantity" data-id="${item.id}">+</button>
                    <button class="remove-item" data-id="${item.id}">Удалить</button>
                </div>
            `;
            cartContainer.appendChild(itemElement);

            // Добавляем обработчики событий на кнопки
            itemElement.querySelector('.remove-item').addEventListener('click', removeFromCart);
            itemElement.querySelector('.increase-quantity').addEventListener('click', increaseQuantity);
            itemElement.querySelector('.decrease-quantity').addEventListener('click', decreaseQuantity);
        });
    }

    function increaseQuantity(event) {
        const productId = event.target.dataset.id;
        const quantityInput = document.querySelector(`.item-quantity[data-id="${productId}"]`);
        let newQuantity = parseInt(quantityInput.value, 10) + 1;
        quantityInput.value = newQuantity;

        updateCartQuantity(productId, newQuantity);
    }

    function decreaseQuantity(event) {
        const productId = event.target.dataset.id;
        const quantityInput = document.querySelector(`.item-quantity[data-id="${productId}"]`);
        let newQuantity = parseInt(quantityInput.value, 10) - 1;

        if (newQuantity < 1) {
            newQuantity = 1; // Минимальное количество 1
        }

        quantityInput.value = newQuantity;

        updateCartQuantity(productId, newQuantity);
    }

    function updateCartQuantity(productId, newQuantity) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.map(item => {
            if (item.id === productId) {
                return { ...item, quantity: newQuantity };
            }
            return item;
        });

        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems(); // Обновляем отображение
    }

    function removeFromCart(event) {
        const productId = event.target.dataset.id;
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        cart = cart.filter(item => item.id !== productId);
        
        localStorage.setItem('cart', JSON.stringify(cart));
        
        displayCartItems();
    }

    function clearCart() {
        localStorage.removeItem('cart');
        displayCartItems();
    }

    displayCartItems();

    const clearCartButton = document.getElementById('clear-cart-button');
    if (clearCartButton) {
        clearCartButton.addEventListener('click', clearCart);
    }
});