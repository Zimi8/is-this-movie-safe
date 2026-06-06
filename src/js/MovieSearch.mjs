export default class MovieSearch {
  constructor(dataSource, formElement, resultsElement) {
    this.dataSource = dataSource;
    this.formElement = formElement;
    this.resultsElement = resultsElement;
  }

  init() {
    this.formElement.addEventListener("submit", (e) => {
      e.preventDefault();
      const query = this.formElement.querySelector("#movieSearch").value;
      this.handleSearch(query);
    });
  }

  async handleSearch(query) {
    this.resultsElement.innerHTML = `<p>Searching...</p>`;
    try {
      const results = await this.dataSource.searchMovies(query);
      this.renderResults(results);
    } catch (error) {
      this.resultsElement.innerHTML = `<p style="color: red; font-weight: bold;">${error.message}</p>`;
    }
  }
//Using placeholders, for the moment! ! 
  renderResults(movies) {
    const html = movies.map(movie => {
      const posterSrc = movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Poster";
      return `
        <div class="movie-card">
          <img src="${posterSrc}" alt="${movie.Title} poster">
          <h3>${movie.Title}</h3>
          <p>${movie.Year}</p>
          <a href="/movie/index.html?id=${movie.imdbID}" class="details-link">Check Safety</a>
        </div>
      `;
    }).join("");
    
    this.resultsElement.innerHTML = html;
  }
}