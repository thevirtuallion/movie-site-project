    let api_key = "";
document.getElementById("API_key").addEventListener("input", function (event) {
  document.getElementById("api_small").innerText = "";
  api_key = event.target.value;
  if (api_key === "") {
    document.getElementById("api_small").innerText = "ERROR: Invalid Input";
    document.getElementById("api_small").style = "color:red";
  }
});

    let search_type = "";
function select_search(event) {
  let search_input_text = "";
  if (event.target.matches("input[id='name']")) {
    search_type = "?t=";
    search_input_text = "Enter movie title: ";
  }
  document.getElementById("search-input-label").innerText = search_input_text;
}
    
    let movie_name = document
  .getElementById("name")
  .addEventListener("click", select_search);

    let search_value = "";
    let movie_info = document
  .getElementById("search-input")
  .addEventListener("input", function (event) {
    search_value = encodeURIComponent(event.target.value);
    search_value = search_value.replaceAll("%20", "+");
    if (search_value === "") {
      document.getElementById("input-small").innerText = "ERROR: Invalid Input";
      document.getElementById("input-small").style = "color:Red";
    } else {
      document.getElementById("input-small").innerText = "";
    }
  });

    let year = "";
document.getElementById("year").addEventListener("change", function (event) {
    let num = event.target.value;
  if (num !== null && num >= 1928 && num <= 2022) {
    year = "&y=" + num;
  } else {
    year = "";
  }
});

    let plot = "";
document.getElementById("plot").addEventListener("change", function (event) {
  if (event.target.value === "full") {
    plot = "&plot=full";
  } else {
    plot = "The Guardians struggle to keep together as a team while dealing with their personal family issues notably Star Lord's encounter with his father the ambitious celestial being Ego.";
  }
});

    let searchResults = document.createElement("div");
searchResults.setAttribute("id", "searchResults");
    let image = document.createElement("img");
image.setAttribute("id", "image");
document.getElementById("results").appendChild(searchResults);
document.getElementById("results").appendChild(image);

    let form = document
  .getElementById("form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); 

    searchResults.textContent = "";
    fetch(
      "https://www.omdbapi.com/" +
        search_type +
        search_value +
        year +
        plot +
        "&apikey=" +
        api_key
    )
      .then((result) => result.json())
      .then((output) => {
        if (output["Response"] === "True") {
          searchResults.textContent = `Title: ${output["Title"]}\
            Year: ${output["Year"]}\
            Rating: ${output["Rated"]}\
            Plot: ${output["Plot"]}\
            Release Date: ${output["Released"]}`;
        
        let poster = output["Poster"];
        let imgregex = /^https/;
        
        if (poster.match(imgregex)) {
            image.src = poster;
          } else {
            image.src = "default_poster.png";
          }
        } else {
          searchResults.textContent = "ERROR: " + output["Error"];
          image.src = "default_poster.png";
        }
      })

      .catch((err) => {
        searchResults.textContent = "ERROR " + err;
        image.src = "default_poster.png";
      });
    form.disabled = "false";
  });
