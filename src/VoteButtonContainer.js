import React from 'react';
import axios from 'axios';
import { isNull, clone } from 'lodash';

import VoteButton from './VoteButton';

class VoteButtonContainer extends React.Component {
  onClick = (buttonType) => {
    // tmep
    console.log(this.props);

    let dir, newLikesValue;
    const itemCopy = clone(this.props.item);

    if (this.props.vote === buttonType) {
      newLikesValue = null;
      dir = 0;
    } else {
      if (buttonType === 'up') {
        newLikesValue = true;
        dir = 1;
      } else {
        newLikesValue = false;
        dir = -1;
      }
    }

    itemCopy.data.likes = newLikesValue;
    this.props.updateListItem(this.props.itemId, itemCopy);
    console.log(buttonType);
    console.log(this.props.likes, newLikesValue);

    const params = {
      dir,
      id: this.props.item.data.name,
      rank: 2
    };

    axios({
      method: 'post',
      url: '/protected_api/api/vote',
      params
    })
    .then((response) => {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <VoteButton onClick={this.onClick} {...this.props} />
    );
  }

}

export default VoteButtonContainer;
