
// The element grabed from html
const blade_pic = document.getElementById('original_blade')
const blade_name = document.getElementById('bladeName')
const blade_desc = document.querySelector('.desc')
const blade_price = document.querySelector('.price')
const review = document.querySelector('.msg')
const reviewer = document.querySelector('.author')


function processJsonData(data) {
    // Get the parent element
    const parentElement = document.querySelector('.product')

    const ul = document.createElement('ul');
    parentElement.appendChild(ul);

    const li = document.createElement('li');
    ul.appendChild(li);

    const img_div = document.createElement('div');
    img_div.classList.add('pro-img');
    li.appendChild(img_div);

    const img = document.createElement('img');
    img.id = 'original_blade';
    img.src = data.image; // set image
    img_div.appendChild(img);

    const name = document.createElement('h3');
    name.id = 'bladeName';
    name.textContent = data.name; // set blade name
    li.appendChild(name);

    const desc = document.createElement('p');
    desc.classList.add('desc');
    desc.textContent = data.description; // set blade description
    li.appendChild(desc);

    const price = document.createElement('p');
    price.classList.add('price');
    price.textContent = "CA$" + data.price; // set price
    li.appendChild(price);

    const review_div = document.createElement('div');
    review_div.classList.add('review');
    li.appendChild(review_div);


    const review_a = document.createElement('a');
    review_div.appendChild(review_a);

    const review_msg = document.createElement('span');
    review_msg.classList.add('msg');
    review_msg.textContent = data.review.message; // set review
    review_a.appendChild(review_msg);

    const review_author = document.createElement('span');
    review_author.classList.add('author');
    review_author.textContent = data.review.reviewer; // set reviewer
    review_a.appendChild(review_author);

    const cartBtn = document.createElement('button');
    cartBtn.classList.add('cartBtn')
    cartBtn.textContent = 'Add to Cart';
    li.appendChild(cartBtn)

    
}

fetch('./data/rubber_data.json')
    .then(response => response.json())
    .then (data => {
            data.map(item => {
                processJsonData(item);
            })
        
    })
    .catch(error => {
        console.error('Error: ', error)
    })
