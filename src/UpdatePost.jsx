import React from 'react';
import { Button, Card, Icon } from 'semantic-ui-react'

const UpdatePost = (props) => {
  const { currentUser, deletePost, post } = props;

  const handlePostDestroy = () => {
    const token = localStorage.getItem('token')

    fetch(`http://localhost:3000/api/v1/posts/${post.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(result => result.json())
      .then(data => {
        deletePost(data)
      })
      .catch(err => {
        debugger;
      })
  }

  const handlePostUpdate = () => {
    const token = localStorage.getItem('token')

    fetch(`http://localhost:3000/api/v1/posts/${post.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(result => result.json())
      .then(data => {
        deletePost(data)
      })
      .catch(err => {
        debugger;
      })
  }

  const currentUserOwnsPost = currentUser.id === post.author_id;

  if (currentUserOwnsPost) {
    return (
      <Card.Content extra>
        <Button icon onClick={handlePostDestroy}>
          <Icon name='trash'/>
        </Button>

        <Button icon onClick={handlePostUpdate}>
          <Icon name='edit'/>
        </Button>
      </Card.Content>
    )
  } else {

    return null;
  };
}

export default UpdatePost;
