export default function gallaryMarkup(images) {
  return images
    .map(image => {
      return `
        <div class="photo-card">
          <a class="photo-card__link" href="${image.largeImageURL}">
            <img class="photo-card__image" src="${image.webformatURL}" alt="${image.tags}" loading="lazy"/></a>
          <div class="info">
              <p class="info-item">
                  <b>Likes ${image.likes}</b></p>
              <p class="info-item">
                  <b>Views ${image.views}</b></p>
              <p class="info-item">
                  <b>Comments ${image.comments}</b></p>
              <p class="info-item">
                  <b>Downloads ${image.downloads}</b></p>
          </div>
        </div>`;
    })
    .join('');
}
