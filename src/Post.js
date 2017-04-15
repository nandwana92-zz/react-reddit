import React from 'react';
import axios from 'axios';
import { map } from 'lodash';
import glamorous from 'glamorous';
import Spinner from 'react-spinkit';
import shortid from 'shortid';

import assignUniqueKeys from './utils/assignUniqueKeys';
import CommentList from './CommentList';
import SubredditListItem from './SubredditListItem';

const { Div, Span, Button, A, B, Img } = glamorous;
const sortOptions = ['confidence', 'top', 'new', 'controversial', 'old', 'random', 'qa', 'live'];
const defaultSort = 'confidence';

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isPostInitialized: false,
      comments: [],
      header: [],
      sort: defaultSort,
      commentHierarchy: [],
      flatComments: {}
    };
  }

  flattenComments = (data, flatComments = {}, commentHierarchy = []) => {
    // const flatComments = {},
    //   commentHierarchy = [];

    insertComments(data, commentHierarchy);

    function insertComments(data, parent) {
      map(data, (value, index) => {
        const commentId = shortid.generate();
        const comment = {
          commentId,
          kids: []
        };

        flatComments[commentId] = value;
        parent.push(comment);

        if (typeof value.data.replies === 'object') {
          insertComments(value.data.replies.data.children, comment.kids);
        }
      });
    }

    // this.setState({
    //   flatComments,
    //   commentHierarchy
    // });
    console.log(flatComments);
    console.log(commentHierarchy);

    return {
      flatComments,
      commentHierarchy
    }
  }

  getPostData = () => {
    // get comments and other post data
    const prefix = this.props.isLoggedIn ? 'protected' : 'public';
    this.setState({
      isLoading: true
    });

    axios({
      url: `/${prefix}_api/comments/${this.props.match.params.id}.json`,
      params: {
        raw_json: 1,
        sort: this.state.sort
      }
    })
    .then((response) => {
      console.log(response);
      this.flattenComments(response.data[1].data.children);

      this.setState({
        isPostInitialized: true,
        isLoading: false,
        comments: response.data[1].data.children,
        header: response.data[0].data.children[0],
        ...this.flattenComments(response.data[1].data.children)
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  handleSortChange = (e) => {
    console.log(this);
    console.log(e.target.value);
    this.setState({
      sort: e.target.value
    }, () => {
      this.getPostData();
    });
  }

  componentWillMount() {
    this.getPostData();
  }

  render() {
    return (
      <div>
        <hr />
        <div>
          <div>THIS IS POST</div>
          <div>{this.props.match.params.subreddit}</div>
          <div>{this.props.match.params.id}</div>
        </div>
        {
          !this.state.isPostInitialized
          ? (
            <Div display="flex" justifyContent="center" padding="10px">
              <Spinner noFadeIn spinnerName='double-bounce' />
            </Div>
          )
          : (
            <div>
              <SubredditListItem item={this.state.header} />
              <select value={defaultSort} name="sort" onChange={this.handleSortChange}>
                {
                  map(sortOptions, (value) => <option key={value} value={value}>{value}</option>)
                }
              </select>
              {
                this.state.isLoading
                ? (
                  <Div display="flex" justifyContent="center" padding="10px">
                    <Spinner noFadeIn spinnerName='double-bounce' />
                  </Div>
                )
                : (
                  <CommentList postFullName={this.state.header.data.name} isLoggedIn={this.props.isLoggedIn} flatComments={this.state.flatComments} commentHierarchy={this.state.commentHierarchy} even={true} kids={this.state.commentHierarchy} />
                )
              }
            </div>
          )
        }
      </div>
    );
  }

}

const Thing = ({ val }) => (
  <Div backgroundColor="#ecffe6" margin="20px">
    <span>
      hello {val}
    </span>
    {
      val - 1 > 0
      ? <Thing val={val - 1} />
      : ''
    }
  </Div>
);

export default Post;
