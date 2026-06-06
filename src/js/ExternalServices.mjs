export default class ExternalServices {
  constructor() {
    this.omdbKey = "dcf4e13b";
    this.omdbBase = `https://www.omdbapi.com/?apikey=${this.omdbKey}`;
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
}