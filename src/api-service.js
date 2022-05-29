
import Notiflix from 'notiflix';

const API_KEY = '27499746-ea1acdf5875e01b04afecd44b';
const BASE_URL = 'https://pixabay.com/api/';

export const PictureService = {

    page: 1,
    async  fetchPictures(pictures) {

        return await this.fetchP(pictures).then((pictures) => {

            if (pictures.hits.length === 0 || pictures === " " || pictures === "" ) {
                Notiflix.Notify.failure(`Sorry, there are no images matching your search query. Please try again.`);
                console.log('Sorry, there are no images matching your search query. Please try again.');
                //this.clearPicturesContainer();
                loadMoreBtn.classList.add('is-hidden');
                return;
            }

            Notiflix.Notify.success(`Hooray! We found ${pictures.totalHits} images.`);
            console.log(pictures);
            //loadMoreBtn.classList.remove('is-hidden');

            //renderPictures(pictures);
        }).catch(); //onFetchError

    },
    fetchP(pictures) {
        return fetch(`${BASE_URL}?key=${API_KEY}&q=${pictures}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}&pretty=true`).then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }

            this.page += 1;
            console.log('page', this.page);
            return response.json();
        })
    },
    resetPage() {
        this.page = 1;
    },   

    onFetchError(error) {
    Notiflix.Notify.failure(`Oops, there is no pictures with that name`);
    },





}