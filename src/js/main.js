import ExternalServices from "./ExternalServices.mjs";
import MovieSearch from "./MovieSearch.mjs";
import SafetyDashboard from "./SafetyDashboard.mjs";

const dataSource = new ExternalServices();

const searchForm = document.querySelector("#searchForm");
if (searchForm) {
  const resultsContainer = document.querySelector("#searchResults");
  const movieSearch = new MovieSearch(dataSource, searchForm, resultsContainer);
  movieSearch.init();
}

const movieDashboard = document.querySelector("#movieDashboard");
if (movieDashboard) {
  const dashboard = new SafetyDashboard(dataSource);
  dashboard.init();
}