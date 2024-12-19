function renderCart() {
    const add_product_cart = document.querySelector('.cads');
    add_product_cart.innerHTML = '';
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        add_product_cart.innerHTML = '<p>Корзина пустая</p>';
        return;
    }
    cart.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
            <div class="button-delete-fav">
                <button class="delete-button">
                    <img class="delete" src="png/delete.png" alt="Удалить">
                </button>
                <button class="fav-button">
                    <img class="fav" src="png/fav.png" alt="В избранное">
                </button>
            </div>
            <div class="content-card">
                <div class="article" hidden>${product.article}</div>
                <a href="#" class="card-link">
                    <img src="${product.imgSrc}.png" alt="${product.title}" width="120px" height="150px">
                    <div class="text-card">${product.title}</div>
                </a>
                <button class="price-card" style="justify-content: center; align-items: center;">
                    <p class="text-card" style="color: white;font-size: 15px;">${product.price} Р</p>
                </button>
            </div>
            <div class="number">
                <button class="del"><p style="font-size: 20px;">-</p></button>
                <p>${product.quantity}</p>
                <button class="add"><p style="font-size: 20px;">+</p></button>
            </div>
        `;

        card.querySelector('.delete-button').addEventListener('click', () => {
            const updatedCart = cart.filter(item => item.article !== product.article);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            renderCart();
            calculate();
        });

        card.querySelector('.add').addEventListener('click', () => {
            product.quantity += 1;
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
            calculate();
        });

        card.querySelector('.del').addEventListener('click', () => {
            if (product.quantity > 1) {
                product.quantity -= 1;
                localStorage.setItem('cart', JSON.stringify(cart));
            } else {
                const updatedCart = cart.filter(item => item.article !== product.article);
                localStorage.setItem('cart', JSON.stringify(updatedCart));
            }
            renderCart();
            calculate();
        });

        add_product_cart.appendChild(card);
        calculate()
    });

    function calculate() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        let sum = 0;
        cart.forEach(product => {
            sum += product.price * product.quantity;
        });
        const change_total_place = document.querySelector('.amount-total-price');
        change_total_place.textContent = `${sum} P`;
    }
}

document.addEventListener('DOMContentLoaded', renderCart);