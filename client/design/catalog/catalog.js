const add_to_cart = document.querySelectorAll('.price-card');

add_to_cart.forEach(button => {
    button.addEventListener('click', () => {
        const card = button.closest('.card');
        const article = card.querySelector('.article').textContent
        const title = card.querySelector('.text-card').textContent;
        const price = button.querySelector('.text-card').textContent.replace(' Р', '');
        const imgSrc = card.querySelector('img').src;

        const product = {article, title, price, imgSrc, quantity: 1
        };

        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        const existingProduct = cart.find(item => item.article === product.article);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push(product);
        }

        localStorage.setItem('cart', JSON.stringify(cart));

        showNotification("ТОВАР ДОБАВЛЕН")
        
    });
});

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}
