import './sass/main.scss';
import Notiflix from 'notiflix';
import picturesTemplate from './partials/pictures-template.hbs';

//import SimpleLightbox from "simplelightbox/dist/simple-lightbox.esm";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { PictureService } from "./api-service";

const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-input');
const picturesContainer = document.querySelector('.pictures-container');
const loadMoreBtn = document.querySelector('.load-more-btn');

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMoreBtn);

function onSearch(evt) {

    evt.preventDefault();

    let searchInputKey = searchInput.value.trim();

    PictureService.query = searchInputKey;
    PictureService.resetPage();
    clearPicturesContainer();

    if (!searchInputKey) {
        Notiflix.Notify.failure(`Sorry, there are no images matching your search query. Please try again.`);
        loadMoreBtn.classList.add('is-hidden');
        return;
    }
    

    PictureService.fetchPictures()
        .then((data) => {
            //console.log(data);
            Notiflix.Notify.success(`Hooray! We found ${data.total} images.`);

            loadMoreBtn.classList.remove('is-hidden');
            renderPictures(data);

            if (data.total < PictureService.per_page) {
                loadMoreBtn.classList.add('is-hidden');
            }  

        })
        .catch(onFetchError);

}

function renderPictures(pictures) {

    picturesContainer.insertAdjacentHTML('beforeend', picturesTemplate(pictures.hits)) //.hits

    let gallery = new SimpleLightbox('.pictures-container a', {
        captionsData: 'alt',
        captionDelay: 250,
        captionPosition: 'bottom',
});

}

function onLoadMoreBtn(evt) {
    
    PictureService.fetchPictures()
        .then((data) => {
            loadMoreBtn.classList.remove('is-hidden');
            renderPictures(data);

            if ((PictureService.page - 1) * PictureService.per_page > data.total) {
                loadMoreBtn.classList.add('is-hidden');
            }

        })
        .catch(onFetchError);

}

function clearPicturesContainer() {
    picturesContainer.innerHTML = '';
}

function onFetchError(error) {
    //Notiflix.Notify.failure(`Oops, there is no pictures with that name`);
    loadMoreBtn.classList.add('is-hidden');
}

