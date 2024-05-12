async function anime(id) {
    try {
      const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`);
  
      if (!response.ok) {
        throw new Error("API couldn't be reached");
      }
  
      const data = await response.json();
      console.log(data);
  
      const container = document.getElementById("myanime");
  
      // Create the box div
      const box = document.createElement("div");
      box.className = "animes";
  
      // Set the title and image
      const title = document.createElement("p");
      title.id = "title";
      const tit = data.data.titles[0].title;
      title.textContent = tit;
  
      //Set type of the type
      const type = document.createElement("p");
      type.textContent = data.data.type;
      type.id = "type";
  
      // Create the anchor tag inside the box
      const anchor = document.createElement("a");
      anchor.href = "#popup-box-" + id; // Unique ID for each popup box
  
      const img = document.createElement("img");
      img.src = data.data.images.jpg.image_url;
      img.id = "anime";
  
      const dur = data.data.duration;
      const rate = data.data.rating;
      const ranking = data.data.rank;
      const pop = data.data.popularity;
      const genres = data.data.genres[0].name;
  
      const back = data.data.background;
      const syno = data.data.synopsis;
      // const trailer = data.data.trailer.url;
  
      anchor.innerHTML =
        '<img src="' + data.data.images.jpg.image_url + '" alt="">';
  
      // Append the anchor to the box
      box.appendChild(anchor);
  
      // Append the box to the container
      container.appendChild(box);
  
      // Create the popup box
      const popupBox = document.createElement("div");
      popupBox.id = "popup-box-" + id; // Unique ID for each popup box
      popupBox.className = "modal";
  
      // Create the inner content div
      const contentDiv = document.createElement("div");
      contentDiv.className = "content";
  
      // Create the heading
      const heading = document.createElement("h1");
      heading.textContent = tit;
      heading.style.color = "green";
      const hr1 = document.createElement("hr");
      const hr2 = document.createElement("hr");
  
      // Create the synopsis
      const synopsis = document.createElement("p");
      synopsis.innerHTML = "<strong>Synopsis:</strong> " + syno;
  
      //Duration
      const duration = document.createElement("p");
      duration.innerHTML = "<strong>Duration:</strong> " + dur;
  
      //Backgoround
      const background = document.createElement("p");
      if (back) {
        background.innerHTML = "<strong>Background:</strong> " + back;
      }
  
      //Rating
      const rating = document.createElement("p");
      rating.innerHTML = "<strong>Rating :</strong> " + rate;
  
      //Polarity
      const popularity = document.createElement("p");
      popularity.innerHTML = `<strong>Popularity:</strong> #${pop}`;
  
      //Genre
      const genre = document.createElement("p");
      genre.innerHTML = "<strong>Genre: </strong> " + genres;
  
      //Ranking
      const rank = document.createElement("p");
      rank.innerHTML = `<strong>Rank: </strong> #${ranking} `;
  
      // Create the close button
      const closeButton = document.createElement("a");
      closeButton.href = "#";
      closeButton.innerHTML = "&times;";
      closeButton.style.position = "absolute";
      closeButton.style.top = "10px";
      closeButton.style.right = "10px";
      closeButton.style.color = "#fe0606";
      closeButton.style.fontSize = "30px";
      closeButton.style.textDecoration = "none";
  
      // Append the heading, paragraph, and close button to the content div
      contentDiv.appendChild(heading);
  
      contentDiv.appendChild(hr1);
  
      contentDiv.appendChild(synopsis);
  
      if (back) {
        contentDiv.appendChild(background);
      }
  
      contentDiv.appendChild(hr2);
      contentDiv.appendChild(duration);
      contentDiv.appendChild(rating);
      contentDiv.appendChild(popularity);
      contentDiv.appendChild(genre);
      contentDiv.appendChild(rank);
  
      contentDiv.appendChild(closeButton);
      // Append the content div to the popup box
      popupBox.appendChild(contentDiv);
  
      // Append the popup box to the container
      container.appendChild(popupBox);
  
      // Append the title to the box
      box.appendChild(title);
      box.appendChild(type);
    } catch (error) {
      console.error(error);
    }
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    for (let id = 1; id <= 150; id++) {
      anime(id);
    }
  });
  
  // Create a dictionary and store id to details mapping
  // Another meethod takes in that id and make a pop up, dropdow