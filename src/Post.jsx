import React from 'react';
import PostComment from './PostComment'
import UpdatePost from './UpdatePost'
import { Card } from 'semantic-ui-react'

class Post extends React.Component {
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

  render() {
    const { currentUser, deletePost, post } = this.props;
    const color = this.determineColor(post.subject);

    return (
      <Card color={color}>
        <Card.Content>
          <Card.Header>{post.author}</Card.Header>
          <Card.Description>{post.content}</Card.Description>
        </Card.Content>

        <UpdatePost
          currentUser={currentUser}
          deletePost={deletePost}
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
