import React from 'react';
import PostComment from './PostComment'
import { Card } from 'semantic-ui-react'

class Post extends React.Component {
  render() {
    const { post } = this.props;

    return (
      <Card>
        <Card.Content>
          <Card.Header>{post.author}</Card.Header>
          <Card.Description>{post.content}</Card.Description>
        </Card.Content>

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
      </Card>
    );
  }
};

export default Post;
