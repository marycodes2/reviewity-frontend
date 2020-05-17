import React from 'react';
import PostComment from './PostComment'
import UpdatePost from './UpdatePost'
import AddComment from './AddComment'
import { Button, Card, Header, Label, Form, TextArea } from 'semantic-ui-react'

class Post extends React.Component {
  state = {
    editing: false,
    editedPostContent: this.props.post.content,
    viewComments: false,
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

  renderComments = () => {
    const { currentUser, deleteComment, post } = this.props;
    const { viewComments } = this.state;

     if (post.comments.length > 0 && viewComments) {
      return (
        <Card.Content>
          <Header as='h5'>
            Comments
          </Header>

          {
            post.comments.map((comment) => {
              return (
                <PostComment
                  comment={comment}
                  currentUser={currentUser}
                  deleteComment={deleteComment}
                  key={`comment-${comment.id}`}
                />
              )
            })
          }
      </Card.Content>
      )
    }
  }

  renderCommentInfo = () => {
    const { viewComments } = this.state;
    const { post: { comments } } = this.props;
    const commentLength = comments.length
    const commentButtonContent = commentLength === 1 ?  "1 comment" : commentLength + " comments"


    if (comments.length > 0) {
      return (
        <>
          <Button
            size='tiny'
            onClick={() => this.setState({viewComments: !viewComments})}
          >
            { viewComments ? "Hide Comments" : commentButtonContent }
          </Button>
        </>
      )
    } else {
       return (
         <>
           No Comments
        </>
      )
    }
  }

  addCommentToPost = (comment) => {
    this.setState({viewComments: true})
    this.props.addComment(comment)
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

        <Card.Content>
          <UpdatePost
            currentUser={currentUser}
            deletePost={deletePost}
            editing={editing}
            editPost={this.editPost}
            post={post}
          />

          {this.renderCommentInfo()}
        </Card.Content>

        <AddComment
          addComment={this.addCommentToPost}
          currentUser={currentUser}
          post={post}
        />

        {this.renderComments()}
      </Card>
    );
  }
};

export default Post;
