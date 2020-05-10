import React from 'react'
import { Button, Form, TextArea } from 'semantic-ui-react'

class CreatePost extends React.Component {
  state = {
    postContent: '',
    subject: '',
  }

  subjects = ['Fitness', 'Beauty', 'Conservation', 'Finance']

  subjectOptions = this.subjects.map((subject) => {
    return { key: subject, text: subject, value: subject }
  })

  handleCreatePost = () => {
    const { postContent, subject } = this.state;
    const { addNewPost, currentUser } = this.props;

    fetch('http://localhost:3000/api/v1/posts', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        post_content: postContent,
        subject,
        user_id: currentUser.id,
      }),
    })
      .then(result => result.json())
      .then(data => {
        this.setState({postContent: '', subject: ''})

        addNewPost(data)
      })
      .catch(err => {
        debugger;
      })
  }

  render() {
    const { postContent, subject } = this.state;

    return (
      <>
        <Form>
          <Form.Field
            control={TextArea}
            onChange={event => this.setState({postContent: event.target.value})}
            label='Create a post'
            placeholder='I would like to know..'
            value={postContent}
          >
          </Form.Field>
          <Form.Select
            fluid
            label='Topic'
            value={subject}
            onChange={event => this.setState({subject: event.target.innerText})}
            options={this.subjectOptions}
            placeholder='Topic'
          >
          </Form.Select>
          <Button
            onClick={this.handleCreatePost}
          >
            Post
          </Button>
        </Form>
      </>
    );
  }
};

export default CreatePost;
