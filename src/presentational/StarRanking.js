/* @flow */

import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';

type Props = {
  value: number,
};

class StarRanking extends Component<Props> {
  static defaultProps = {
    value: 0,
  };

  render() {
    const { value } = this.props;

    return (
      <StarRatingComponent name="starRanking" value={value} editing={false} />
    );
  }
}

export default StarRanking;
