
import Notiflix from 'notiflix';

const API_KEY = '27499746-ea1acdf5875e01b04afecd44b';
const BASE_URL = 'https://pixabay.com/api/';

export const PictureService = {

    page: 1,
    searchQuery: '',
    per_page: 12,

    async fetchPictures() {
        
        try {

            const response = await fetch(`${BASE_URL}?key=${API_KEY}&q=${this.query}&image_type=photo&page=${this.page}&per_page=${this.per_page}`,);
            const data = await response.json();

            if (data.hits.length === 0) {
                Notiflix.Notify.failure(`Sorry, there are no images matching your search query. Please try again.`);
                return;
            }

            this.incrementPage();
            return data;

        } catch (error) {
            console.error(error);
        }
    },

    resetPage() {
        this.page = 1;
    },
    incrementPage() {
        this.page += 1;
    },

    set query(value) {
        this.searchQuery = value;
    },
    get query() {
        return this.searchQuery;
    },

};
