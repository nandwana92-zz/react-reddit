import React from 'react';
import axios from 'axios';
import { map, cloneDeep } from 'lodash';
import glamorous from 'glamorous';
import Spinner from 'react-spinkit';
import shortid from 'shortid';
import Loader from 'halogen/MoonLoader';

import assignUniqueKeys from './utils/assignUniqueKeys';
import CommentList from './CommentList';
import SubredditListItem from './SubredditListItem';
import CustomButton from './CustomButton';

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

  loadMoreComments = (commentId, rootId, moreChildrenItem) => {
    const commentHierarchyCopy = cloneDeep(this.state.commentHierarchy);
    let parent,
      moreChildrenItemIndex;

    function getParentFromTree(subTree) {
      for (var i = 0; i < subTree.length; i++) {
        if (subTree[i].commentId === commentId) {
          subTree.splice(i, 1);
          parent = subTree;
          break;
        } else if (subTree[i].kids.length) {
          getParentFromTree(subTree[i].kids)
        }
      }
    }

    getParentFromTree(commentHierarchyCopy);

    const prefix = this.props.isLoggedIn ? 'protected' : 'public';
    const tree = [];

    axios({
      url: `/${prefix}_api/api/morechildren.json`,
      params: {
        raw_json: 1,
        api_type: 'json',
        sort: this.state.sort,
        link_id: this.state.header.data.name,
        children: moreChildrenItem.data.children.join(',')
      }
    })
    .then((response) => {
      constructCommentTree(response.data.json.data.things);
      const { flatComments, commentHierarchy } = this.flattenComments(tree);
      parent.push(...commentHierarchy);

      this.setState({
        flatComments: {...this.state.flatComments, ...flatComments},
        commentHierarchy: commentHierarchyCopy
      });
    })
    .catch(function (error) {
      console.log(error);
    });

    function constructCommentTree(data) {

      map(data, (value, index) => {
        const parentId = value.data['parent_id'];

        if (parentId === rootId) {
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

  flattenComments = (data, flatComments = {}, commentHierarchy = []) => {
    insertComments(data, commentHierarchy);

    function insertComments(data, parent, parentCommentId = null) {
      map(data, (value, index) => {
        const commentId = shortid.generate();
        const comment = {
          commentId,
          parentCommentId,
          kids: [],
        };

        flatComments[commentId] = value;
        parent.push(comment);

        if (typeof value.data.replies === 'object') {
          insertComments(value.data.replies.data.children, comment.kids, commentId);
        }
      });
    }

    return {
      flatComments,
      commentHierarchy
    }
  }

  getPostData = () => {
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
              <select value={this.state.sort} name="sort" onChange={this.handleSortChange}>
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
                  <CommentList loadMoreComments={this.loadMoreComments} postFullName={this.state.header.data.name} isLoggedIn={this.props.isLoggedIn} flatComments={this.state.flatComments} commentHierarchy={this.state.commentHierarchy} even={true} kids={this.state.commentHierarchy} />
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
