import React from 'react';
import { Button, Comment, Header, Form } from 'semantic-ui-react'

class PostComment extends React.Component {
  render() {
    const { comment } = this.props;

    return (
      <>
        <Header as='h5'>
          Comments
        </Header>

        <Comment>
          <Comment.Content>
            <Comment.Author>
              {comment.author}
            </Comment.Author>

            <Comment.Text>
              {comment.content}
            </Comment.Text>
          </Comment.Content>
        </Comment>

        <br />

        <Form reply>
          <Form.TextArea placeholder='I think..'/>
          <Button content='Add Reply' labelPosition='left' icon='edit' primary />
        </Form>
      </>
    );
  }
};

export default PostComment;
