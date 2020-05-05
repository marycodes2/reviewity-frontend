import React from 'react'
import { Button, Form, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class Signup extends React.Component {
  render() {
    return (
      <>
        <Header>
          Signup
        </Header>
        <Form>

          <Form.Field>
            <label>First Name</label>
            <Form.Input width={4} placeholder='User Name' />
          </Form.Field>

          <Form.Field>
            <label>Last Name</label>
            <Form.Input width={4} placeholder='User Name' />
          </Form.Field>

          <Form.Field>
            <label>Email</label>
            <Form.Input width={4} placeholder='User Name' />
          </Form.Field>

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
      </>
    );
  }
};

export default Signup;
