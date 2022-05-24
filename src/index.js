import './sass/main.scss';
import Notiflix from 'notiflix';
import picturesTemplate from './partials/pictures-template.hbs';

//import SimpleLightbox from "simplelightbox/dist/simple-lightbox.esm";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const API_KEY = '27499746-ea1acdf5875e01b04afecd44b';
const BASE_URL = 'https://pixabay.com/api/';

const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-input');
const picturesContainer = document.querySelector('.pictures-container');
const loadMoreBtn = document.querySelector('.load-more-btn');

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMoreBtn);

function onSearch(evt) {

    evt.preventDefault();

    console.log(searchInput.value);

    fetchPictures(searchInput.value).
        then((pictures) => {

            if (pictures.hits.length === 0) {
                Notiflix.Notify.failure(`Sorry, there are no images matching your search query. Please try again.`);
                console.log('Sorry, there are no images matching your search query. Please try again.');
                clearPicturesContainer();
                loadMoreBtn.classList.add('is-hidden');
                return;
            }

            Notiflix.Notify.success(`Hooray! We found ${pictures.totalHits} images.`);

            //resetPage();
            //clearPicturesContainer();
            renderPictures(pictures);
            
            
            console.log(pictures);
            loadMoreBtn.classList.remove('is-hidden');

        }).catch(onFetchError);
    

}

function renderPictures(pictures) {
    
    // const markup = picturesTemplate(pictures.hits);
    // picturesContainer.innerHTML = markup;
    picturesContainer.insertAdjacentHTML('beforeend', picturesTemplate(pictures.hits))

    let gallery = new SimpleLightbox('.pictures-container a', {
        captionsData: 'alt',
        captionDelay: 250,
        captionPosition: 'bottom',
});

}


async function fetchPictures(pictures) {

    let page = 1;

    return await fetch(`${BASE_URL}?key=${API_KEY}&q=${pictures}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}&pretty=true`).then(response => {
        if (!response.ok) {
            throw new Error(response.status);
        }

        page += 1;
        console.log('page', page);
        return response.json();
    });

}

function onLoadMoreBtn(evt) {
    console.log("LOAD MORE CLICK");

    onSearch(evt);

}

function resetPage() {
    page = 1;
}

function clearPicturesContainer() {
    picturesContainer.innerHTML = '';
}

function onFetchError(error) {
    Notiflix.Notify.failure(`Oops, there is no pictures with that name`);
}

