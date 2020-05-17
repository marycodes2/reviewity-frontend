import React from 'react';
import { Button, Comment, Divider, Icon } from 'semantic-ui-react'

const PostComment = (props) => {
  const { comment, currentUser, deleteComment } = props;
  const currentUserOwnsComment = comment.author_id === currentUser.id;

  const handleCommentDestroy = () => {
    const token = localStorage.getItem('token')

    fetch(`http://localhost:3000/api/v1/comments/${comment.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(result => result.json())
      .then(data => {
        deleteComment(data)
      })
      .catch(err => {
        debugger;
      })
  }

  const renderDeleteButton = () => {
    if (currentUserOwnsComment) {
      return (
        <Button
          icon
          onClick={handleCommentDestroy}
          size='tiny'
        >
          <Icon name='trash'/>
        </Button>
      )
    } else {
      return null;
    }
  }

  return (
    <>
      <Comment>
        <Comment.Content>
          <Comment.Author>
            {comment.author}
          </Comment.Author>

          <Comment.Text>
            {comment.content}
          </Comment.Text>

          {renderDeleteButton()}
        </Comment.Content>
      </Comment>

      <Divider />
    </>
  );
};

export default PostComment;
