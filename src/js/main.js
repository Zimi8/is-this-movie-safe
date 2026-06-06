import ExternalServices from "./ExternalServices.mjs";
import MovieSearch from "./MovieSearch.mjs";

const dataSource = new ExternalServices();
const searchForm = document.querySelector("#searchForm");
const resultsContainer = document.querySelector("#searchResults");

const movieSearch = new MovieSearch(dataSource, searchForm, resultsContainer);
movieSearch.init();


console.log("App initialized");

