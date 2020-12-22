const auth = "563492ad6f91700001000001dee8a2565efa4fb889e9ac74139dfcdf";
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const submitBtn = document.querySelector('.submit-btn');
let searchValue;


async function pics() {
    const dataFetch = await fetch("https://api.pexels.com/v1/curated?per_page=15&page=1",
        {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: auth
            }
        }
    );
    const data = await dataFetch.json();
    console.log(data);
}
pics();


