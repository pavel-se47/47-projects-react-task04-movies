import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import moviesApi from '../Api/api';
import withRouter from 'components/Api/props';
import rout from '../../routes';
import { nanoid } from 'nanoid';

class HomePage extends Component {
  state = {
    movies: [],
  };

  componentDidMount() {
    moviesApi
      .fetchTrendingMovies()
      .then(popularMoviesOfDay => {
        this.setState({ movies: [...popularMoviesOfDay] });
      })
      .catch(error => console.log(error));
  }

  render() {
    const { movies } = this.state;

    return (
      <ul key={nanoid()} className="trendingMovies">
        <h1>Trending films and serials today</h1>
        {movies.map(movie => (
          <div key={nanoid()}>
            <li key={movie.id}>
              <NavLink to={`${rout.search}/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  alt={movie.title || movie.name}
                ></img>
                <span>{movie.title || movie.name}</span>
              </NavLink>
            </li>
          </div>
        ))}
      </ul>
    );
  }
}

export default withRouter(HomePage);
