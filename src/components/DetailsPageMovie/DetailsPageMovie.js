import { Component } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import withRouter from 'components/Api/props';
import moviesApi from '../Api/api';
import Cast from 'components/CastMoviePage/CastMoviePage';
import Reviews from 'components/ReviewsMoviePage/ReviewsMoviePage';
import rout from '../../routes';
import { nanoid } from 'nanoid';

class DetailsPage extends Component {
  state = {
    poster_path: null,
    title: null,
    release_date: null,
    vote_average: null,
    overview: null,
    genres: null,
  };

  componentDidMount() {
    moviesApi
      .fetchDetailsMovie(this.props.router.params.movieId)
      .then(detailsMovie => this.setState({ ...detailsMovie }));
  }

  return = () => {
    const { navigate } = this.props.router;
    navigate(-1);
  };

  render() {
    const { poster_path, title, release_date, vote_average, overview, genres } =
      this.state;

    return (
      <>
        {this.state.poster_path !== null && (
          <>
            <div className="movieDetails">
              <button type="button" onClick={this.return}>
                Go back
              </button>
              <ul>
                <img
                  src={`https://image.tmdb.org/t/p/original${poster_path}`}
                  alt={title}
                ></img>
                <li>
                  <h3>{title}</h3> <p>{release_date}</p>
                  <h3>User Score:</h3> <p>{vote_average}/10</p>
                  <h3>Overview:</h3> <p>{overview}</p>
                </li>
              </ul>
              <ul>
                <h3>Genres:</h3>
                {genres ? (
                  genres.map(genre => <li key={nanoid()}>{genre.name}</li>)
                ) : (
                  <h4>This movie has no genre</h4>
                )}
              </ul>
              <h2>Additional info</h2>
              <div className="additional">
                <NavLink to={`${`cast`}`} className="additional__link">
                  Cast
                </NavLink>
                <NavLink to={`${`reviews`}`} className="additional__link">
                  Reviews
                </NavLink>
              </div>
            </div>

            <Routes>
              <Route path={rout.cast} element={<Cast />} />
              <Route path={rout.rev} element={<Reviews />} />
            </Routes>
          </>
        )}
      </>
    );
  }
}

export default withRouter(DetailsPage);
