import product from '../data/blade_data.json' assert { type: 'json' };

function jumpToDetail() {
    // Create a new page URL
    var newPageUrl = "../Table_Tennis_Shop/detail_page.html";

    let products_blade = document.querySelectorAll('.product ul')

    for (let i = 0; i < products_blade.length; i++) {
        products_blade[i].addEventListener('click', () => {
            window.location.href = newPageUrl;
            console.log(products_blade[i].innerHTML)
        })
    }
    
}

// let img_detail = document.getElementById("blade_img").src;
// console.log(img_detail)

jumpToDetail()

console.log(product)