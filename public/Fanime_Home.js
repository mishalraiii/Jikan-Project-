document.addEventListener("DOMContentLoaded", function () {
    fetchTopAiringAnimeTV();
    fetchTopAiringAnimeMovies();
});

async function fetchTopAiringAnimeTV() {
    try {
        const response = await fetch('https://api.jikan.moe/v4/top/anime?type=tv&filter=airing&sfw=true&limit=4');

        if (!response.ok) {
            throw new Error("API couldn't be reached");
        }

        const data = await response.json();
        console.log(data);

        const containerTV = document.getElementById("top-anime-container-tv");
        containerTV.innerHTML = '';

        data.data.forEach(anime => {
            displayAnime(anime, containerTV);
        });
        showSlides(1, 'tv');
    } catch (error) {
        console.error(error);
    }
}

async function fetchTopAiringAnimeMovies() {
    try {
        const response = await fetch('https://api.jikan.moe/v4/top/anime?type=Movie&filter=airing&sfw=true&limit=4');

        if (!response.ok) {
            throw new Error("API couldn't be reached");
        }

        const data = await response.json();
        console.log(data);

        const containerMovies = document.getElementById("top-anime-container-movies");
        containerMovies.innerHTML = '';

        data.data.forEach(anime => {
            displayAnime(anime, containerMovies);
        });
        showSlides(1, 'movies');
    } catch (error) {
        console.error(error);
    }
}

function displayAnime(anime, container) {
    const slide = document.createElement("div");
    slide.className = "mySlides";

    const box = document.createElement("div");
    box.className = "animes";

    const title = document.createElement("p");
    title.textContent = anime.title;
    title.className = "anime-title";

    const rating = document.createElement("p");
    rating.textContent = anime.score !== null && anime.score !== undefined ? "Rating: " + anime.score.toFixed(1) : "Rating: N/A";

    const genre = document.createElement("p");
    genre.textContent = "Genre: " + anime.genres.map(genre => genre.name).join(', ');

    const anchor = document.createElement("a");
    anchor.href = "#popup-box-" + anime.rank;

    const img = document.createElement("img");
    img.src = anime.images.jpg.image_url;
    img.id = "anime";
    img.style.border = "2px solid black";

    anchor.appendChild(img);

    box.appendChild(anchor);
    box.appendChild(title);
    box.appendChild(rating);
    box.appendChild(genre);
    slide.appendChild(box);

    container.appendChild(slide);
}

let slideIndex = { 'tv': 1, 'movies': 1 };

function plusSlides(n, sliderType) {
    showSlides(slideIndex[sliderType] += n, sliderType);
}

function showSlides(n, sliderType) {
    let i;
    const slides = document.querySelectorAll(`#top-anime-container-${sliderType} .mySlides`);
    if (n > slides.length) { slideIndex[sliderType] = 1 }
    if (n < 1) { slideIndex[sliderType] = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex[sliderType] - 1].style.display = "block";
}
