import React from 'react';
import { Button, Card, Icon } from 'semantic-ui-react'

const UpdatePost = (props) => {
  const { currentUser, deletePost, editing, post, editPost } = props;

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

  const currentUserOwnsPost = currentUser.id === post.author_id;

  const editPostIcon = editing ? 'checkmark' : 'edit';

  if (currentUserOwnsPost) {
    return (
      <Card.Content>
        <Button size='tiny' icon onClick={editPost}>
          <Icon name={editPostIcon}/>
        </Button>

        <Button size='tiny' icon onClick={handlePostDestroy}>
          <Icon name='trash'/>
        </Button>
      </Card.Content>
    )
  } else {

    return null;
  };
}

export default UpdatePost;
