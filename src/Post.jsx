import React from 'react';
import PostComment from './PostComment'
import UpdatePost from './UpdatePost'
import { Card, Label, Form, TextArea } from 'semantic-ui-react'

class Post extends React.Component {
  state = {
    editing: false,
    editedPostContent: this.props.post.content,
  }

  determineColor = (subject) => {
    switch (subject) {
      case 'Fitness':
        return 'blue';

      case 'Beauty':
        return 'violet';

      case 'Conservation':
        return 'green';

      case 'Finance':
        return 'olive';

      default:
        return 'orange'
    }
  }

  editPost = () => {
    const { editing } = this.state;

    this.setState({editing: !editing})

    if (editing) {
      this.handlePostUpdate()
    }
  }

  handlePostUpdate = () => {
    const { post, editPost } = this.props;
    const { editedPostContent } = this.state;

    const token = localStorage.getItem('token')

    fetch(`http://localhost:3000/api/v1/posts/${post.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        content: editedPostContent,
      }),
    })
      .then(result => result.json())
      .then(data => {
        editPost(data)
      })
      .catch(err => {
        debugger;
      })
  }

  cardDescription = () => {
    const { editing, editedPostContent } = this.state;
    const { post } = this.props;

    if (editing) {
      return (
        <Form>
          <Form.Field
            control={TextArea}
            onChange={event => this.setState({editedPostContent: event.target.value})}
            value={editedPostContent}
          >
          </Form.Field>
        </Form>
      )
    } else {
      return <Card.Description>{post.content}</Card.Description>
    }
  }

  render() {
    const { currentUser, deletePost, post } = this.props;
    const { editing } = this.state;
    const color = this.determineColor(post.subject);

    return (
      <Card color={color}>
        <Card.Content>
          <Card.Header>{post.author}</Card.Header>
          <br/>
          <Label color={color} size='tiny'>{post.subject}</Label>

          {this.cardDescription()}
        </Card.Content>

        <UpdatePost
          currentUser={currentUser}
          deletePost={deletePost}
          editing={editing}
          editPost={this.editPost}
          post={post}
        />

        {
          post.comments.length > 1 && (
            <Card.Content>
              {
                post.comments.map((comment) => {
                  return (
                    <PostComment
                      key={`comment-${comment.id}`}
                      comment={comment}
                    />
                  )
                })
              }
            </Card.Content>
          )
        }
      </Card>
    );
  }
};

export default Post;
