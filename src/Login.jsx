import React from 'react'
import { Button, Form, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class Login extends React.Component {
  render() {
    return (
      <>
        <Header>
          Log in
        </Header>
        <Form>
          <Form.Field>
            <label>User Name</label>
            <Form.Input width={4} placeholder='User Name' />
          </Form.Field>

          <Form.Field>
            <label>Password</label>
            <Form.Input width={4} placeholder='Password' />
          </Form.Field>

          <Form.Field>
            <Button type='submit'>Submit</Button>
          </Form.Field>
        </Form>

        <Header>Aren't a community member?</Header>
        <Button color='pink' as={Link} to="/signup">Apply</Button>
      </>
    );
  }
};

export default Login;
