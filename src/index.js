import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import AxiosApiService from './components/axios-api-service';
import gallaryMarkup from './components/gallaryMarkup';

const axiosApiService = new AxiosApiService();

const gallery = new SimpleLightbox('.gallery a', {
  scrollZoom: false,
  captionsData: 'alt',
  captionDelay: 250,
});

const refs = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};
let totalHits = 0;

refs.loadMoreBtn.style.display = 'none';

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(e) {
  e.preventDefault();
  removeMarkup();

  if (e.currentTarget.elements.searchQuery.value.trim() === '') {
    return;
  }

  axiosApiService.resetPage();
  axiosApiService.query = e.currentTarget.elements.searchQuery.value.trim();

  const images = await axiosApiService.fetchImages();

  if (images.hits.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }

  totalHits = images.totalHits;

  Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);

  totalHits -= images.hits.length;

  addToHTML(gallaryMarkup(images.hits));

  if (totalHits !== 0) {
    refs.loadMoreBtn.style.display = 'block';
  } else {
    refs.loadMoreBtn.style.display = 'none';
  }

  gallery.refresh();
}

async function onLoadMore() {
  const images = await axiosApiService.fetchImages();

  totalHits -= images.hits.length;

  addToHTML(gallaryMarkup(images.hits));

  if (totalHits === 0 || totalHits < 0) {
    refs.loadMoreBtn.style.display = 'none';
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
    return;
  }

  gallery.refresh();

  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  setTimeout(() => {
    window.scrollBy({
      top: cardHeight * 4,
      behavior: 'smooth',
    });
  }, 300);

  // document.addEventListener('DOMContentLoaded', function () {});
}

function addToHTML(markup) {
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function removeMarkup() {
  refs.gallery.innerHTML = '';
}
