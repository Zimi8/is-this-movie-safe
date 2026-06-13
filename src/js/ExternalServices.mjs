export default class ExternalServices {
  constructor() {
    this.omdbKey = "dcf4e13b";
    this.omdbBase = `https://www.omdbapi.com/?apikey=${this.omdbKey}`;
    this.imdbApiBase = `https://api.imdbapi.dev/titles`;
  }

  async searchMovies(query) {
    const response = await fetch(`${this.omdbBase}&s=${query}`);
    const data = await response.json();
    if (data.Response === "True") {
      return data.Search;
    } else {
      throw new Error(data.Error);
    }
  }

  async getMovieDetails(id) {
    const response = await fetch(`${this.omdbBase}&i=${id}`);
    const data = await response.json();
    if (data.Response === "True") {
      return data;
    } else {
      throw new Error(data.Error);
    }
  }

  async getParentsGuide(id) {
    const response = await fetch(`${this.imdbApiBase}/${id}/parentsGuide`);
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Parents guide not found for this movie.");
    }
  }
}