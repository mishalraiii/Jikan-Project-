function callAPI(){
    fetch('/',{
        method:'POST'
    })
    .then((res) => res.json())
    .then((res) => {
        console.log(res)
    })
}
window.onload = callAPI;




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
    } catch (error) {
        console.error(error);
    }
}

function displayAnime(anime, container) {
    // Create the box div
    const box = document.createElement("div");
    box.className = "animes";

    // Set the title and image
    const title = document.createElement("p");
    title.textContent = anime.title;
    title.className = "anime-title";

    // Check if anime.score is not null or undefined before calling toFixed method
    const rating = document.createElement("p");
    if (anime.score !== null && anime.score !== undefined) {
        rating.textContent = "Rating: " + anime.score.toFixed(1); // Assuming the score is provided as a float
    } else {
        rating.textContent = "Rating: N/A";
    }

    const genre = document.createElement("p");
    genre.textContent = "Genre: " + anime.genres.map(genre => genre.name).join(', ');

    // Create the anchor tag inside the box
    const anchor = document.createElement("a");
    anchor.href = "#popup-box-" + anime.rank; // Unique ID for each popup box

    const img = document.createElement("img");
    img.src = anime.images.jpg.image_url;
    img.id = "anime";

    img.style.border = "2px solid black";

    anchor.appendChild(img);

    // Append elements to the box
    box.appendChild(anchor);
    box.appendChild(title);
    box.appendChild(rating);
    box.appendChild(genre);

    // Append the box to the container
    container.appendChild(box);
}

document.addEventListener("DOMContentLoaded", function () {
    fetchTopAiringAnimeTV();
    fetchTopAiringAnimeMovies();
});
