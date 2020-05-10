import React from 'react'
import { Button, Form, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  }

  handleSubmit = () => {
    const { email, password } = this.state;

    fetch('http://localhost:3000/api/v1/sessions', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({email, password}),
    })
      .then(result => result.json())
      .then(data => {
        localStorage.setItem("token", data.jwt)
        this.props.updateCurrentUser(data.user)
      })
      .catch(err => {
        debugger;
      })
  }

  render() {
    return (
      <>
        <Header>
          Log in
        </Header>
        <Form>
          <Form.Field>
            <label>Email</label>
            <Form.Input
              width={4}
              placeholder='Email'
              onChange={event => this.setState({email: event.target.value})}
            />
          </Form.Field>

          <Form.Field>
            <label>Password</label>
            <Form.Input
              width={4}
              placeholder='Password'
              onChange={event => this.setState({password: event.target.value})}
            />
          </Form.Field>

          <Form.Field>
            <Button
              type='submit'
              onClick={this.handleSubmit}
            >
              Submit
            </Button>
          </Form.Field>
        </Form>

        <Header>Aren't a community member?</Header>
        <Button color='pink' as={Link} to="/signup">
          Apply
        </Button>
      </>
    );
  }
};

export default Login;
