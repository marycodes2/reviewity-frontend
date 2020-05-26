import React from 'react';
import { Button, Card, Dropdown, Header, Icon } from 'semantic-ui-react'

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

  if (currentUserOwnsPost) {
    return (
      <>
        <Dropdown
          floating
          labeled
          icon=""
          text="..."
          style={{float: "right"}}
        >
          <Dropdown.Menu>
            <Dropdown.Item>
              <Header as="h5" link onClick={editPost}>
                Edit
              </Header>
            </Dropdown.Item>

            <Dropdown.Item>
              <Header as="h5" link onClick={handlePostDestroy}>
                Delete
              </Header>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </>
    )
  } else {

    return null;
  };
}

export default UpdatePost;
