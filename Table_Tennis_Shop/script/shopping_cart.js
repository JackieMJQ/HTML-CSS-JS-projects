import product from '../data/rubber_data.json' assert { type: 'json' };

let carts = document.querySelectorAll('.cartBtn');

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(product[i]);
        totalCost(product[i]);
    })
}
//  keep cart number as same as local storage
function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers')

    if (productNumbers) {
        document.querySelector('#cart span').textContent = productNumbers;
    }
}

function cartNumbers(product, action) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    // check if there is any in cart local storage
    if( action ) {
        localStorage.setItem("cartNumbers", productNumbers - 1);
        document.querySelector('#cart span').textContent = productNumbers - 1;
        // console.log("action running");
    } else if( productNumbers ) {
        localStorage.setItem("cartNumbers", productNumbers + 1);
        document.querySelector('#cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem("cartNumbers", 1);
        document.querySelector('#cart span').textContent = 1;
    }
    setItems(product);
    
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {
        if (cartItems[product.name] == undefined) {
            cartItems = {
                ...cartItems,
                [product.name]: product
            }
        }
        cartItems[product.name].inCart += 1
    } else {
        product.inCart = 1;
        cartItems = {
            [product.name]: product
        }
    
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems))
}

function totalCost(product , action) {
    let cartCost = localStorage.getItem('totalCost');

    if( action) {
        cartCost = parseInt(cartCost);

        localStorage.setItem("totalCost", cartCost - product.price);
    } else if(cartCost != null) {
        
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    
    } else {
        localStorage.setItem("totalCost", product.price);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems)

    let productContainer = document.querySelector('.cart-products');
    let cartCost = localStorage.getItem('totalCost');

    console.log(cartItems);
    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `<div class="cart-product">
                <ion-icon name="close-circle" class="remove"></ion-icon>
                <img src="${item.image}">
                <span>${item.name}</span>
            </div> 
            <div class="cart-price">CA$${item.price}</div>
            <div class='cart-quantity'>
                <ion-icon class="decrease" name="caret-back-circle-outline"></ion-icon><span>${item.inCart}</span><ion-icon class="increase" name="caret-forward-circle-outline"></ion-icon>
            </div>
            <div class="cart-total">
                CA$${item.inCart * item.price}
            </div>
            `
        });

        productContainer.innerHTML += `
        <div class="basketTotalContainer">
            <h4 class='basketTotalTitle'>
                Basket Total
            </h4>
            <h4 class = 'basketTotal'>
                CA$${cartCost}
            </h4>
        </div>
        `

        deleteButtons();
        manageQuantity()
    }
}

function manageQuantity() {
    let decreaseButtons = document.querySelectorAll('.decrease')
    let increaseButtons = document.querySelectorAll('.increase')
    let currentQuantity = 0
    let currentProduct = ''
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems)

    for (let i=0; i < increaseButtons.length; i++) {
        decreaseButtons[i].addEventListener('click', ()=> {
            console.log(cartItems)
            currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent
            console.log(currentQuantity)
            currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent
            console.log(currentProduct);

            if (cartItems[currentProduct].inCart > 1) {
                cartItems[currentProduct].inCart -= 1;
                cartNumbers(cartItems[currentProduct], "decrease");
                totalCost(cartItems[currentProduct], "decrease")
                localStorage.setItem('productsInCart', JSON.stringify(cartItems));
                displayCart()
            }
        });

        increaseButtons[i].addEventListener('click', () => {
            console.log(cartItems)
            currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
            currentProduct = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent

            cartItems[currentProduct].inCart += 1;
            cartNumbers(cartItems[currentProduct]);
            totalCost(cartItems[currentProduct]);
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));
            displayCart();
        })
    }
}

function deleteButtons() {
    let deleteButtons = document.querySelectorAll('.cart-product ion-icon');
    let productNumbers = localStorage.getItem('cartNumbers');
    let cartCost = localStorage.getItem('totalCost');
    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems)
    let productName;
    console.log(cartItems);

    for (let i=0; i<deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', () => {
            productName = deleteButtons[i].parentElement.querySelector('span').textContent;

            console.log("pro name",productName)

            localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart);
            localStorage.setItem('totalCost', cartCost - (cartItems[productName].price * cartItems[productName].inCart));

            delete cartItems[productName];
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));

            displayCart();
            onLoadCartNumbers();
        })
    }
}

onLoadCartNumbers()

displayCart()