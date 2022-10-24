import axios from 'axios';

const params = {
  key: '30802386-ea58133b3015dc71d1fd472a7',
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 16,
  safesearch: true,
};

export default class AxiosApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchImages() {
    try {
      const url = `https://pixabay.com/api/?q=${this.searchQuery}&page=${this.page}`;
      const response = await axios.get(url, { params });

      this.incrementPage();
      return response.data;
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
    }
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
