const auth = // auth key 
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const form = document.querySelector('.search');
const more = document.querySelector('.more');
let searchValue;
let page = 1;
let fetchItem;
let currentSearch;


// Listeners

searchInput.addEventListener('input', updateInput);
form.addEventListener('submit', (e) => {
    e.preventDefault();
    currentSearch = searchValue;
    searchPics(searchValue);
})

more.addEventListener('click', findMore);

// fns

function updateInput(e) {
    searchValue = e.target.value;
    // console.log(e.target.value);
}


async function fetchApi(url) {
    const dataFetch = await fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: auth
        }
    });
    const data = await dataFetch.json();
    return data;
}

function generatePics(data) {
    data.photos.forEach(photo => {
        const galleryImg = document.createElement('div');
        galleryImg.classList.add('gallery-img');
        galleryImg.innerHTML = `
        <img class="img" src = ${photo.src.large}></img> 
        <div class='gallery-info'>
        <a href="${photo.src.original}">Download</a>
        </div>
        
        `;
        gallery.appendChild(galleryImg);
    });

}

async function pics() {
    fetchItem = "https://api.pexels.com/v1/curated?per_page=18&page=1";
    const data = await fetchApi(fetchItem);
    generatePics(data);


};

async function searchPics(find) {
    clear(); // invoking here...    
    fetchItem = `https://api.pexels.com/v1/search?query=${find}+query&per_page=18&page=1`;
    const data = await fetchApi(fetchItem);
    generatePics(data);
}

// lets clear the old search results

function clear() {
    gallery.innerHTML = "";
}

async function findMore() {
    page++;
    if (currentSearch) {
        fetchItem = `https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=15&page=${page}` // shows next page
    } else {
        fetchItem = `https://api.pexels.com/v1/curated?per_page=16&page=${page}`

    }
    const data = await fetchApi(fetchItem); //get data
    generatePics(data); // to pass the data

}

pics();


