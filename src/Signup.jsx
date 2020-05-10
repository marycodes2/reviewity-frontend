import React from 'react'
import { Button, Form, Header } from 'semantic-ui-react'

class Signup extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  }


  handleSubmit = () => {
    const { firstName, lastName, email, password } = this.state;

    fetch('http://localhost:3000/api/v1/users', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email,
        password
      }),
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
          Signup
        </Header>
        <Form>

          <Form.Field>
            <label>First Name</label>
            <Form.Input
              width={4}
              placeholder='First Name'
              onChange={event => this.setState({firstName: event.target.value})}
            />
          </Form.Field>

          <Form.Field>
            <label>Last Name</label>
            <Form.Input
              width={4}
              placeholder='Last Name'
              onChange={event => this.setState({lastName: event.target.value})}
            />
          </Form.Field>

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
      </>
    );
  }
};

export default Signup;
