function renderFAV() {
    calculate()
    const add_product_fav = document.querySelector('.favorites');
    add_product_fav.innerHTML = '';
    const favorite = JSON.parse(localStorage.getItem('favorite')) || [];
    
    if (favorite.length === 0) {
        add_product_fav.innerHTML = '<p>НЕТУ ИЗБРАННОГО</p>';
        return;
    }
    let string;

    favorite.forEach((product, index) => {
        if (index % 4 === 0) {
            string = document.createElement('div');
            string.classList.add('string');
            add_product_fav.appendChild(string);
            cads = document.createElement('div');
            cads.classList.add('cads');
            add_product_fav.appendChild(cads);
        }

        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
                <button class="fav-button">
                    <img class="fav" src="png/fav1.png">
                </button>
                <div class="content-card">
                    <div class="article" hidden>${product.article}</div>
                    <a href="C:/Users/vicka/Desktop/PetShop/client/design/card/card.html" class="card-link">
                        <img src="${product.imgSrc.png}" alt="onecard" width="120px" height="150px">
                        <div class="text-card">${product.title}</div>
                    </a>
                    <button class="price-card" style="justify-content: center; align-items: center;">
                        <p class="text-card" style="color: white;font-size: 15px;">${product.price} Р</p>
                    </button>                        
                </div>
        `;

        cads.appendChild(card)
        const favButton = card.querySelector('.fav-button');
        favButton.addEventListener('click', () => {
            const updatedFavorite = favorite.filter(item => item.article !== product.article);
            localStorage.setItem('favorite', JSON.stringify(updatedFavorite))
            renderFAV()
            showNotification('ТОВАР УДАЛЕН ИЗ ИЗБРАННОГО')
        });
    });
    const add_to_cart = document.querySelectorAll('.price-card')
    add_to_cart.forEach(button_cart => {
        button_cart.addEventListener('click', () => {
            const card = button_cart.closest('.card')
            const article = card.querySelector('.article').textContent
            const title = card.querySelector('.text-card').textContent
            const price = button_cart.querySelector('.text-card').textContent.replace(' Р', '')
            const imgSrc = card.querySelector('img').src

            const product = {article, title, price, imgSrc, quantity: 1}

            const cart = JSON.parse(localStorage.getItem('cart')) || []

            const isProduct = cart.find(item => item.article === product.article)
            if (isProduct) {
                isProduct.quantity += 1 } 
            else {
                cart.push(product)
            }

            localStorage.setItem('cart', JSON.stringify(cart))

            showNotification("ТОВАР ДОБАВЛЕН В КОРЗИНУ")
            calculate()
            
        })

    })

    function calculate() {
        const cart = JSON.parse(localStorage.getItem('cart')) || []
        let sum = 0
        cart.forEach(product => {
            sum += product.price * product.quantity
        });
        const change_total_place_menu = document.querySelector('.price')
        change_total_place_menu.textContent = `${sum} р.`
    }
    
    function showNotification(message) {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
}

document.addEventListener('DOMContentLoaded', renderFAV);
