const url = 'http://felipesoares:3000/top_five?query=';

export const getPhotos  = (query) => {
  console.log(query);
  console.log(`${url}${query}`);
  return fetch(`${url}${query}`)
    .then((response) => {
      return response.json()
    })
    .catch((error) => {
      console.log(error, 'ooops');
    })
}

export const getPhotosLinks = (photos) => {
  const linkPhotos = photos.map((photo) => photo.attributes.table.urls.regular)
  return linkPhotos;
}
