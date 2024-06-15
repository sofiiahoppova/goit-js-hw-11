import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getPhotos } from "./js/pixabay-api";
import { galleryTemplate, showLoader, closeLoader } from "./js/render-functions";
import imageUrl from "./img/bi_x-octagon.svg";

const messageOptions = {
    message: 'Sorry, there are no images matching your search query. Please, try again!',
    messageColor: 'white',
    backgroundColor: '#EF4040',
    iconUrl: imageUrl,
    maxWidth: '360px',
    position: 'topRight',
    theme: 'dark',
}

const lightBox = new SimpleLightbox('.gallery a',{
    captionsData: 'alt',
    captionDelay: 250,
});

const formElem = document.querySelector('.search-form');
const galleryElem = document.querySelector('.gallery');

formElem.addEventListener('submit', onFormElemSubmit);

function onFormElemSubmit(event) {
    event.preventDefault();

    galleryElem.innerHTML = '';
    showLoader();
    getPhotos(formElem.elements.search.value.trim())
        .then(data => {
            if (data.hits.length == 0) iziToast.show(messageOptions);
            const markup = galleryTemplate(data.hits);
            galleryElem.innerHTML = markup;
            lightBox.refresh();
        })
        .catch(err => console.log(err))
        .finally(() => { closeLoader() });
}


