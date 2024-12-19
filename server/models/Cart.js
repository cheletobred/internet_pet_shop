// Находим контейнер для карточек
const cardsContainer = document.querySelector('.cads');

// Функция для создания новой карточки
function createCard({ imgSrc, title, price, quantity }) {
    // Создаём корневой элемент карточки
    const card = document.createElement('div');
    card.classList.add('card');

    // Внутренний HTML карточки
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
            <a href="#" class="card-link">
                <img src="${imgSrc}" alt="${title}" width="120px" height="150px">
                <div class="text-card">${title}</div>
            </a>
            <button class="price-card" style="justify-content: center; align-items: center;">
                <p class="text-card" style="color: white;font-size: 15px;">${price} Р</p>
            </button>
        </div>
        <div class="number">
            <button class="add-del"><p style="font-size: 20px;">-</p></button>
            <p>${quantity}</p>
            <button class="add-del"><p style="font-size: 20px;">+</p></button>
        </div>
    `;

    return card;
}

// Функция для добавления карточки в контейнер
function addCardToContainer(product) {
    const newCard = createCard(product);
    cardsContainer.appendChild(newCard);
}

// Пример вызова для добавления товара
const exampleProduct = {
    imgSrc: 'png/4.png',
    title: 'Новая попона для собак',
    price: '1200',
    quantity: 1,
};

document.querySelector('.arrange').addEventListener('click', () => {
    addCardToContainer(exampleProduct);
});
