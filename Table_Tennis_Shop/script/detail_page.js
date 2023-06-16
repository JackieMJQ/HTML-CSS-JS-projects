// get NUMBER query parameters from url
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const bladeNumber = parseInt(urlParams.get('number'));

const img = document.querySelector('#blade_img');
const feature = document.querySelector('#feature-text');
const price = document.querySelector('#price');
const blade_class = document.querySelector('#class');
const plies = document.querySelector('#plies');
const weight = document.querySelector('#weight');
const blade_thickness = document.querySelector('#blade_thickness')
const blade_size = document.querySelector('#blade_size')
const fl_handle_size = document.querySelector('#fl_handle_size')
const st_handle_size = document.querySelector('#st_handle_size')
const made_in = document.querySelector('#made_in')
const video = document.getElementById('video')

fetch('./data/blade_data.json')
    .then(response => response.json())
    .then(data => {
        let blade = data.filter(data => data.number === bladeNumber)[0]; // should only be 1 result, if each blade has a unique number
        console.log(blade)
        img.src = blade.image;
        feature.innerText = blade.feature;
        price.innerText = blade.price;
        blade_class.innerText = "Class:  " + blade.blade_data.class
        plies.innerText = "Plies:  " + blade.blade_data.plies
        weight.innerText = "Weight:  " + blade.blade_data.weight
        blade_thickness.innerText = "Thickness:  " + blade.blade_data.blade_thickness
        blade_size.innerText = "Blade Size:  " + blade.blade_data.blade_size
        fl_handle_size.innerText = "FL Handle Size:  " + blade.blade_data.FL_handle_size
        st_handle_size.innerText = "ST Handle Size:  " + blade.blade_data.st_handle_size
        made_in.innerText = "Country:  " + blade.blade_data.country
        video.src = blade.review.review_video
        document.title = blade.name
    })