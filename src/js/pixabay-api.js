export function getPhotos(request) {
    const BASE_URL = 'https://pixabay.com/api/';
    const params = new URLSearchParams({
        key: '44402114-eddf09e8e038ad1f496236950',
        q: request,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
    });

    const url = `${BASE_URL}?${params}`;

    return fetch(url).then(result => result.json());
}
