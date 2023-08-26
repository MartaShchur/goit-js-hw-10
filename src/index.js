
import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import './styles.css';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css';

import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_c2vp58LgyS5g8ljIA3yluFIy4vOl1HNEOPZ9uLLOcMAoHfvcGzkdSmRdR0PTOewC";

const ref = {
    selector: document.querySelector('.breed-select'),
    divCatInfo: document.querySelector('.cat-info'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
};
const { selector, divCatInfo, loader, error } = ref;


// selector.classList.add('is-hidden');
loader.classList.replace('is-hidden', 'loader');
error.classList.add('is-hidden');
divCatInfo.classList.add('is-hidden');

let arrBreedsId = [];

fetchBreeds()
    .then(data => {
     data.forEach(element => {
        arrBreedsId.push({text: element.name, value: element.id});
    });
    new SlimSelect({
        select: selector,
        data: arrBreedsId
    });
    })
    .catch((err) => {});

    selector.addEventListener('change', onSelectBreed);

function onSelectBreed(evt) {
    loader.classList.replace('is-hidden', 'loader');
    selector.classList.add('is-hidden', '.breed-select');
    divCatInfo.classList.add('is-hidden');

    const breedId = evt.currentTarget.value;
    fetchCatByBreed(breedId)
    .then(data => {
        loader.classList.replace('loader', 'is-hidden');
        selector.classList.remove('is-hidden');

        const { url, breeds } = data[0];
        
        divCatInfo.innerHTML = `<div class="box-img"><img src="${url}" alt="${breeds[0].name}" width="400"/></div><div class="box"><h1>${breeds[0].name}</h1><p>${breeds[0].description}</p><p><b>Temperament:</b> ${breeds[0].temperament}</p></div>`
        divCatInfo.classList.remove('is-hidden');
    })
        .catch((err) => {
        error.classList.add('is-hidden');
    });
};






