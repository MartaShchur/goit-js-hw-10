import { fetchBreeds, fetchCatByBreed } from './cat-api';
import './styles.css';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_c2vp58LgyS5g8ljIA3yluFIy4vOl1HNEOPZ9uLLOcMAoHfvcGzkdSmRdR0PTOewC';

const ref = {
  selector: document.querySelector('.breed-select'),
  divCatInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  p_error: document.querySelector('.error'),
};
const { selector, divCatInfo, loader, p_error } = ref;

divCatInfo.classList.add('is-hidden');

let arrBreedsId = [];

fetchBreeds()
    .then(data => {
    //   if (!data.ok) {
    //             throw new Error(data.statusText);
    //     }
        
    data.forEach(element => {
      arrBreedsId.push({ text: element.name, value: element.id });
    });
    new SlimSelect({
      select: selector,
      data: arrBreedsId,
    });
      selector.addEventListener('change', onSelectBreed);
  })
  .catch(err => { });
  
function displayCatInfo(catData) {
    
    const { url, breeds } = catData[0];

  divCatInfo.innerHTML = `<div class="box-img">
    <img src="${url}" alt="${breeds[0].name}" width="400"/></div>
    <div class="box"><h1>${breeds[0].name}</h1>
    <p>${breeds[0].description}</p>
    <p><b>Temperament:</b> ${breeds[0].temperament}</p></div>`;

  loader.classList.replace('loader', 'is-hidden');
  divCatInfo.classList.remove('is-hidden');
}

function onSelectBreed(evt) {

  divCatInfo.classList.add('is-hidden');
    loader.classList.replace('is-hidden', 'loader');
    p_error.classList.add('is-hidden');

  const breedId = evt.currentTarget.value;

  fetchCatByBreed(breedId)
      .then(data => {
        // console.log(data)
        if (data.length === 0) {
            
        loader.classList.replace('loader', 'is-hidden');   
        p_error.classList.remove('is-hidden');

              return     
        }

        displayCatInfo(data);
    //   const { url, breeds } = data[0];
    //   divCatInfo.innerHTML = `<div class="box-img">
    //     <img src="${url}" alt="${breeds[0].name}" width="400"/></div>
    //     <div class="box"><h1>${breeds[0].name}</h1>
    //     <p>${breeds[0].description}</p>
    //     <p><b>Temperament:</b> ${breeds[0].temperament}</p></div>`;

    // loader.classList.replace('loader', 'is-hidden');
    // divCatInfo.classList.remove('is-hidden');
        
    })
      .catch ( (err)=> {
          console.log(err)
          
    });
}
