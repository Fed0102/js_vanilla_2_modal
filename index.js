let fruits = [
    {
        id: 1,
        title: 'Apples',
        price: 20,
        img: 'https://www.producemarketguide.com/media/user_v1oz1Yz27j/665/snap-dragon-apples_variety-page.png'
    },
    {
        id: 2,
        title: 'Oranges',
        price: 30,
        img: 'https://www.melissas.com/cdn/shop/products/image-of-organic-valencia-oranges-fruit-14764196593708_600x600.jpg?v=1628029322'
    },
    {
        id: 3,
        title: 'Mango',
        price: 40,
        img: 'https://m.media-amazon.com/images/S/assets.wholefoodsmarket.com/PIE/product/57b379c97608743e9e2d5a87_produce-mango-1._TTD_._SR600,600_._QL100_.jpg'
    },
];

const toHTML = fruit => `
        <div class="col">
            <div class="card align-items-center">
                <img style="width: 300px"
                     src="${fruit.img}"
                     class="card-img-top" alt="..."
                     alt="${fruit.title}">
                <div class="card-body text-center">
                    <h5 class="card-title" style="justify-content: center">${fruit.title}</h5>
                    <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">
                        See price
                    </a>
                    <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">
                        Delete
                    </a>
                </div>
            </div>
        </div>
    `;

const render = () => {
    document.querySelector('#fruits').innerHTML =
        fruits.map(toHTML).join('');
}

render();

const priceModal = $.modal({
    title: 'Product price',
    closable: true,
    width: '400px',
    footerButtons: [
        {
            text: 'Close',
            type: 'primary',
            handler() {
                priceModal.close();
            }
        },
    ],
});

document.addEventListener('click', event => {
    event.preventDefault()
    const btnType = event.target.dataset.btn;
    const id = +event.target.dataset.id;
    const fruit = fruits.find(f => f.id === id);

    if (btnType === 'price') {
        priceModal
            .setContent(`
                <p>${fruit.title} price: 
                    <strong>
                        ${fruit.price}$
                    </strong>
                </p>`
            )
        priceModal.open();
        console.log(fruit);
    } else if (btnType === 'remove') {
        $.confirm({
            title: 'Are you sure?',
            content: `
                <p>You want to remove the fruit: 
                    <strong>
                        ${fruit.title}
                    </strong>
                </p>
            `
        }).then(() => {
            fruits = fruits.filter(f => f.id !== id);
            render();
        }).catch((e) => {
            console.log(e);
        })
    }
});
