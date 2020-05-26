import React from 'react';
import { Button, Comment, Dropdown, Header, Icon } from 'semantic-ui-react'

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
        <Dropdown
          floating
          labeled
          icon=""
          text="..."
          style={{float: "right"}}
        >
          <Dropdown.Menu>
            <Dropdown.Item>
              <Header
                as="h5"
                link
                onClick={handleCommentDestroy}
                style={{float: "right"}}
              >
                Delete
              </Header>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )
    } else {
      return null;
    }
  }

  return (
    <>
      <Comment>
        <Comment.Content>

          {renderDeleteButton()}

          <Comment.Author>
            {comment.author}
          </Comment.Author>

          <Comment.Text>
            {comment.content}
          </Comment.Text>
        </Comment.Content>
      </Comment>
    </>
  );
};

export default PostComment;
