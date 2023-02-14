import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

function fetchTrendingMovies() {
  return axios
    .get(`/trending/all/day?api_key=f62fd78ab53293f9591bba159f0c9694`)
    .then(response => response.data.results);
}

function fetchSearchMovies({ searchQuery = '', currentPage = 1 }) {
  return axios
    .get(
      `/search/multi?api_key=f62fd78ab53293f9591bba159f0c9694&page=${currentPage}&query=${searchQuery}`
    )
    .then(response => response.data.results);
}

function fetchDetailsMovie(id) {
  return axios
    .get(`/movie/${id}?api_key=f62fd78ab53293f9591bba159f0c9694`)
    .then(response => response.data);
}

function fetchCastMovie(id) {
  return axios
    .get(`/movie/${id}/credits?api_key=f62fd78ab53293f9591bba159f0c9694`)
    .then(response => response.data.cast);
}

function fetchReviewsMovie(id) {
  return axios
    .get(`/movie/${id}/reviews?api_key=f62fd78ab53293f9591bba159f0c9694`)
    .then(response => response.data.results);
}

// eslint-disable-next-line
export default {
  fetchTrendingMovies,
  fetchSearchMovies,
  fetchDetailsMovie,
  fetchCastMovie,
  fetchReviewsMovie,
};
