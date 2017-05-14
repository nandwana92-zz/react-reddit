import React from 'react';
import { map } from 'lodash';
import glamorous from 'glamorous';

import Comment from './Comment';

const { Div, Span, Button, A, B, Img } = glamorous;

class CommentList extends React.Component {

  render() {
    return (
      <div>
        {
          map(this.props.kids, (value, index) => {
            return (
              <Comment loadMoreComments={this.props.loadMoreComments} postFullName={this.props.postFullName} isLoggedIn={this.props.isLoggedIn} flatComments={this.props.flatComments} commentHierarchy={this.props.commentHierarchy} commentId={value.commentId} key={value.commentId} even={this.props.even} kids={value.kids} item={this.props.flatComments[value.commentId]} />
            );
          })
        }
      </div>
    );
  }

}

export default CommentList;
