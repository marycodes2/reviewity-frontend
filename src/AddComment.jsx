import React from 'react';
import { Button, Form, TextArea } from 'semantic-ui-react'

class AddComment extends React.Component {
  state = {
    commenting: false,
    comment: "",
  }

  commentContent = () => {
    const { comment, commenting} = this.state;

    if (!commenting) {
      return (
        <Button
          size="tiny"
          onClick={() => this.setState({commenting: !commenting})}
        >
          Comment
        </Button>
      )
    } else {
      return (
        <Form
          onSubmit={this.submitComment}
        >
          <Form.Field
            control={TextArea}
            onChange={event => this.setState({comment: event.target.value})}
            label='Comment'
            placeholder='I think..'
            value={comment}
          />

          <Button
            onClick={() => this.setState({commenting: false})}
            size="tiny"
            icon="cancel"
          />

          <Button
            size="tiny"
            icon="check"
          >
          </Button>
        </Form>
      )
    }
  }

  submitComment = () => {
    const { comment } = this.state;
    const { currentUser, post } = this.props;

    fetch('http://localhost:3000/api/v1/comments', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        content: comment,
        post_id: post.id,
        user_id: currentUser.id,
      }),
    })
      .then(result => result.json())
      .then(data => {
        this.setState({
          commenting: false,
          comment: "",
        })

        this.props.addComment(data)
      })
      .catch(err => {
        debugger;
      })
  }

  render() {
    return (
      <>
        {this.commentContent()}
      </>
    )
  }
};

export default AddComment;
