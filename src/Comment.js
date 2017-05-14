import React from 'react';
import glamorous from 'glamorous';
import TimeAgo from 'react-timeago';
import axios from 'axios';
import { map }  from 'lodash';
import Spinner from 'react-spinkit';

import CommentList from './CommentList';
import CustomButton from './CustomButton';

const { Div, Span, Button, A, B, Img } = glamorous;

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }

  createMarkup(value) {
    return {
      __html: value
    };
  }

  loadMoreComments = (rootId) => {
    console.log('rootId', rootId);
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
      constructCommentTree(response.data.json.data.things);
    })
    .catch(function (error) {
      console.log(error);
    });

    function constructCommentTree(data) {
      const tree = [];
      const flatComments = {};

      map(data, (value, index) => {
        const parentId = value.data['parent_id'];

        if (parentId === rootId) {
          console.log('root!');
          tree.push(value);
        } else {
          let parentNode;
          findParent(tree);

          function findParent(nodeList) {
            for (var i = 0; i < nodeList.length; i++) {
              if (nodeList[i].data.name === parentId) {
                parentNode = nodeList[i];
              } else if (typeof nodeList[i].data.replies === 'object') {
                findParent(nodeList[i].data.replies.data.children)
              }
            }
          }

          if (parentNode) {
            if (typeof parentNode.data.replies !== 'object') {
              parentNode.data.replies = {
                kind: 'Listing',
                data: {
                  modhash: null,
                  children: [],
                  after: null,
                  before: null
                }
              }
            }

            parentNode.data.replies.data.children.push(value);
          }
          console.log('parentNode', parentNode);
        }
      });

      console.log(tree);
    }
  }

  handleLoadMoreClick = () => {
    this.props.loadMoreComments(this.props.commentId, this.props.item.data.parent_id, this.props.item);
    this.setState({
      isLoading: true
    });
  }

  render() {
    return (
      <Div backgroundColor={this.props.even ? '#FAFAFA' : '#EEEEEE'} margin="15px 0 0 15px" padding="10px 0 0 10px" border="5px dashed #C5FFB3">
        {
          this.props.item.kind === 'more'
          ? (
            <CustomButton onClick={this.handleLoadMoreClick} buttonText={this.state.isLoading ? 'loading' : `load more (${this.props.item.data.count})`} showLoader={this.state.isLoading} />
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
                ? <CommentList loadMoreComments={this.props.loadMoreComments} postFullName={this.props.postFullName} isLoggedIn={this.props.isLoggedIn} flatComments={this.props.flatComments} commentHierarchy={this.props.commentHierarchy} even={!this.props.even} kids={this.props.kids} />
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
