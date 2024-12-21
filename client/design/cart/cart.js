function renderCart() {
    const add_product_cart = document.querySelector('.content')
    add_product_cart.innerHTML = ''
    const cart = JSON.parse(localStorage.getItem('cart')) || []
    
    if (cart.length === 0) {
        add_product_cart.innerHTML = '<p>Корзина пустая</p>'
        calculate()
        return
    }

    let string;

    cart.forEach((product, index) => {
        if (index % 4 === 0) {
            string = document.createElement('div')
            string.classList.add('string')
            add_product_cart.appendChild(string)
            cads = document.createElement('div')
            cads.classList.add('cads')
            add_product_cart.appendChild(cads)
        }

        const card = document.createElement('div')
        card.classList.add('card')

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
            const updatedCart = cart.filter(item => item.article !== product.article)
            localStorage.setItem('cart', JSON.stringify(updatedCart))
            renderCart()
            calculate()
        });

        card.querySelector('.add').addEventListener('click', () => {
            product.quantity += 1
            localStorage.setItem('cart', JSON.stringify(cart))
            renderCart()
            calculate()
        });

        card.querySelector('.del').addEventListener('click', () => {
            if (product.quantity > 1) {
                product.quantity -= 1
                localStorage.setItem('cart', JSON.stringify(cart))
            } else {
                const updatedCart = cart.filter(item => item.article !== product.article)
                localStorage.setItem('cart', JSON.stringify(updatedCart))
            }
            renderCart()
            calculate()
        });

        cads.appendChild(card)
        calculate()
    })

    function calculate() {
        const cart = JSON.parse(localStorage.getItem('cart')) || []
        let sum = 0
        cart.forEach(product => {
            sum += product.price * product.quantity
        });
        const change_total_place = document.querySelector('.amount-total-price')
        change_total_place.textContent = `${sum} P`
        const change_total_place_menu = document.querySelector('.price')
        change_total_place_menu.textContent = `${sum} р.`
    }


    const add_to_fav = document.querySelectorAll('.fav-button')
/// let flag =0
    add_to_fav.forEach(button => {
        button.addEventListener('click', () =>{
            const card = button.closest('.card');
            const article = card.querySelector('.article').textContent
            const title = card.querySelector('.text-card').textContent
            const button_price = card.querySelector('.price-card')
            const price = button_price.querySelector('.text-card').textContent.replace(' Р', '')
            const imgSrc = card.querySelector('img').src

            const product = {article, title, price, imgSrc}

            const favorite = JSON.parse(localStorage.getItem('favorite')) || []
            const isProduct = favorite.find(item => item.article === product.article)
            if (!isProduct) {
                const img_fav = button.querySelector('.fav')
                img_fav.src = 'png/fav1.png'
                ///flag = 1
                favorite.push(product)
                showNotification("ТОВАР ДОБАВЛЕН В ИЗБРАННОЕ")
                localStorage.setItem('favorite', JSON.stringify(favorite))
            }
            else {
                const img_fav = button.querySelector('.fav')
                img_fav.src = 'png/fav.png'
                ///flag = 0
                const updatedfav = favorite.filter(item => item.article !== product.article)
                localStorage.setItem('favorite', JSON.stringify(updatedfav))
                showNotification("ТОВАР УДАЛЕН ИЗ ИЗБРАННОГО")
            }

        })
})

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message
    notification.classList.add('show')
    setTimeout(() => {
        notification.classList.remove('show')
    }, 3000)
}
}
document.addEventListener('DOMContentLoaded', () => {
    renderCart()
    changeicon()
});

function changeicon() {
    const favorite = JSON.parse(localStorage.getItem('favorite')) || []
    const allFavButtons = document.querySelectorAll('.fav-button')
    
    allFavButtons.forEach(button => {
        const card = button.closest('.card')
        const article = card.querySelector('.article').textContent
        const img_fav = button.querySelector('.fav')
        
        const isProduct = favorite.find(item => item.article === article)
        if (isProduct) {
            img_fav.src = 'png/fav1.png'
        } 
        else {
            img_fav.src = 'png/fav.png'
        }
    })
}