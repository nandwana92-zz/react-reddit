import React from 'react';
import glamorous from 'glamorous';
import TimeAgo from 'react-timeago';
import axios from 'axios';

import CommentList from './CommentList';

const { Div, Span, Button, A, B, Img } = glamorous;

class Comment extends React.Component {
  createMarkup(value) {
    return {
      __html: value
    };
  }

  loadMoreComments = () => {
    const prefix = this.props.isLoggedIn ? 'protected' : 'public';

    axios({
      url: `/${prefix}_api/api/morechildren.json`,
      params: {
        raw_json: 1,
        api_type: 'json',
        link_id: this.props.postFullName,
        children: this.props.item.data.children.join(',')
      }
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
      <Div backgroundColor={this.props.even ? '#FAFAFA' : '#EEEEEE'} margin="15px" padding="10px" border="5px dashed #C5FFB3">
        {
          this.props.item.kind === 'more'
          ? (
            <button onClick={this.loadMoreComments}>load more ({this.props.item.data.children.length}, {this.props.item.data.count})</button>
          )
          : (
            <div>
              <div>
                <span>{this.props.item.data.author}</span>
                <Span margin="0 10px">{this.props.item.data.score}</Span>
                <TimeAgo date={this.props.item.data.created_utc * 1000} />
              </div>
              <div dangerouslySetInnerHTML={this.createMarkup(this.props.item.data.body_html)} />
              {
                this.props.kids.length
                ? <CommentList postFullName={this.props.postFullName} isLoggedIn={this.props.isLoggedIn} flatComments={this.props.flatComments} commentHierarchy={this.props.commentHierarchy} even={!this.props.even} kids={this.props.kids} />
                : ''
              }
            </div>
          )
        }
      </Div>
    );
  }

}

export default Comment;
