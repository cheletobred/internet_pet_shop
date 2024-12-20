const add_to_cart = document.querySelectorAll('.price-card')
calculate()

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
            } else {
                img_fav.src = 'png/fav.png'
            }
        })
}

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
    const notification = document.getElementById('notification')
    notification.textContent = message
    notification.classList.add('show')
    setTimeout(() => {
        notification.classList.remove('show')
    }, 3000)
}

document.addEventListener('DOMContentLoaded',changeicon)