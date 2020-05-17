import React from 'react';
import MenuBar from './MenuBar'
import CreatePost from './CreatePost'
import Post from './Post'
import { Card, Grid, Loader } from 'semantic-ui-react'

class Newsfeed extends React.Component {
  state = {
    posts: [],
    fetching: true,
  }

  componentDidMount() {
    this.fetchPosts()
  }

  addNewPost = (newPost) => {
    const { posts } = this.state;

    const newPosts = [newPost, ...posts]

    this.setState({posts: newPosts})
  }

  deletePost = (deletedPost) => {
    const { posts } = this.state;

    const newPosts = posts.filter(post => {
      return post.id !== deletedPost.id
    })

    this.setState({posts: newPosts})
  }

  editPost = (editedPost) => {
    const { posts } = this.state;

    const newPosts = posts.map(post => {
      if (post.id === editedPost.id) {
        return editedPost
      }
      else {
        return post
      }
    })

    this.setState({posts: newPosts})
  }

  addComment = (comment) => {
    const { posts } = this.state;

    const editedPosts = posts.map(post => {
      if (post.id === comment.post_id) {
        const updatedComments = [...post.comments, comment]

        return {
          author: post.author,
          author_id: post.author_id,
          comments: updatedComments,
          content: post.content,
          id: post.id,
          subject: post.subject,
        }
      } else {
        return post
      }
    })

    this.setState({posts: editedPosts})
  }


  deleteComment = (deletedComment) => {
    const { posts } = this.state;

    const newPosts = posts.map(post => {
      if (post.id === deletedComment.post_id) {
        const updatedComments = post.comments.filter(comment => comment.id !== deletedComment.id)

        return {
          author: post.author,
          author_id: post.author_id,
          comments: updatedComments,
          content: post.content,
          id: post.id,
          subject: post.subject,
        }
      } else {
        return post
      }
    })

    this.setState({posts: newPosts})
  }

  fetchPosts = () => {
    fetch('http://localhost:3000/api/v1/posts')
      .then(result => result.json())
      .then(data => this.setState({posts: data, fetching: false}))
  }

  render() {
    const { posts, fetching } = this.state;
    const { currentUser } = this.props;

    if (fetching) {
      return <Loader />
    }

    return (
      <React.Fragment>
        <MenuBar handleLogout={this.props.handleLogout}/>
        <Grid columns={3}>
          <Grid.Row>
            <Grid.Column></Grid.Column>
            <Grid.Column>
              <CreatePost
                addNewPost={this.addNewPost}
                currentUser={currentUser}
              />

              <br />

              <br />

              <Card.Group>
              {
                posts.map((post) => {
                  return (
                    <Post
                      addComment={this.addComment}
                      currentUser={currentUser}
                      deleteComment={this.deleteComment}
                      deletePost={this.deletePost}
                      editPost={this.editPost}
                      key={`post-${post.id}`}
                      post={post}
                      />
                  )
                })
              }
              </Card.Group>
            </Grid.Column>
            <Grid.Column></Grid.Column>
          </Grid.Row>
        </Grid>
      </React.Fragment>
    );
  }
};

export default Newsfeed;
