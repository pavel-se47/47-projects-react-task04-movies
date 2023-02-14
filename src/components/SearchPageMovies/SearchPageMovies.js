import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import moviesApi from '../Api/api';
import withRouter from 'components/Api/props';
import { nanoid } from 'nanoid';

const history = createBrowserHistory();

class SearchPage extends Component {
  state = {
    searchQuery: '',
    currentPage: 1,
    searchMovies: [],
  };

  componentDidMount() {
    const { state } = history.location;

    if (this.state.searchMovies === 0 || history.location?.state?.some) {
      this.setState({
        searchQuery: state.some.searchQuery,
        currentPage: state.some.currentPage,
        searchMovies: state.some.searchMovies,
      });
    }
  }

  pushHistory = () => {
    history.push(
      {
        pathname: '/movies',
        search: `?query=${this.state.searchQuery}`,
      },
      {
        some: this.state,
      }
    );
  };

  fetchQuery = () => {
    const { searchQuery, currentPage } = this.state;
    const options = { searchQuery, currentPage };

    moviesApi
      .fetchSearchMovies(options)
      .then(arrSearchMovies => {
        this.setState(prevState => ({
          searchMovies: [...prevState.searchMovies, ...arrSearchMovies],
          currentPage: prevState.currentPage + 1,
        }));
      })
      .catch(error => console.log(error));
  };

  inputChange = event => {
    this.setState({ searchQuery: event.currentTarget.value });
  };

  formSubmit = event => {
    event.preventDefault();

    this.setState({ currentPage: 1, searchMovies: [] });

    this.fetchQuery();
  };

  render() {
    const { searchMovies, searchQuery } = this.state;

    return (
      <>
        <form onSubmit={this.formSubmit}>
          <h1>Search films or Serial</h1>
          <input
            type="text"
            name="name"
            value={searchQuery}
            placeholder="Batman"
            required
            onChange={this.inputChange}
          />
          <button type="submit">Search</button>
        </form>

        {searchMovies.length > 0 && (
          <ul key={nanoid()} className="searchResult">
            <h2>Searching results</h2>
            {searchMovies.map(searchMovie => (
              <li key={searchMovie.id}>
                <NavLink
                  to={{
                    pathname: `${searchMovie.id}`,
                  }}
                >
                  <span>{searchMovie.title || searchMovie.name}</span>
                </NavLink>
              </li>
            ))}
            <button type="button" onClick={this.fetchQuery}>
              Load more
            </button>
          </ul>
        )}

        {searchMovies.length > 0 && this.pushHistory()}
      </>
    );
  }
}

export default withRouter(SearchPage);
