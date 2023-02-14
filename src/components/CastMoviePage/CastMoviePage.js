import React, { Component } from 'react';
import withRouter from 'components/Api/props';
import moviesApi from 'components/Api/api';

class CastMoviePage extends Component {
  state = {
    cast: [],
  };

  componentDidMount() {
    moviesApi
      .fetchCastMovie(this.props.router.params.movieId)
      .then(castMovie => this.setState({ cast: [...castMovie] }));
  }

  render() {
    const { cast } = this.state;
    return (
      <div className="castMovie">
        <ul>
          {cast.map(actor => (
            <li key={actor.name}>
              <img
                src={`https://image.tmdb.org/t/p/original${actor.profile_path}`}
                alt={actor.name}
              ></img>
              <p>Actor name: {actor.name}</p>
              <p>Character of: {actor.character}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default withRouter(CastMoviePage);
