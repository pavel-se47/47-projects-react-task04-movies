import React, { Component } from 'react';
import withRouter from 'components/Api/props';
import moviesApi from 'components/Api/api';

class ReviewsMoviePage extends Component {
  state = {
    reviews: [],
  };

  componentDidMount() {
    moviesApi
      .fetchReviewsMovie(this.props.router.params.movieId)
      .then(reviewsMovie => this.setState({ reviews: [...reviewsMovie] }));
  }

  render() {
    console.log(this.state.reviews);

    const { reviews } = this.state;
    return (
      <div>
        {reviews.length > 0 ? (
          <ul>
            {reviews.map(review => (
              <li key={review.id}>
                <h4>{review.author}:</h4> <p>{review.content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <ul>
            <li>
              <h4>No reviews</h4>
            </li>
          </ul>
        )}
      </div>
    );
  }
}

export default withRouter(ReviewsMoviePage);
