import React from 'react';
import MenuBar from './MenuBar'
import Post from './Post'
import { Button, Card, Divider, Grid, Header } from 'semantic-ui-react'

class Newsfeed extends React.Component {
  state = {
    posts: [],
    fetching: true,
  }

  componentDidMount() {
    this.fetchPosts()
  }

  fetchPosts = () => {
    fetch('http://localhost:3000/api/v1/newsfeeds')
      .then(result => result.json())
      .then(data => this.setState({posts: data, fetching: false}))
  }

  render() {
    const { posts, fetching } = this.state;

    if (fetching) {
      return <h4>Fetching!</h4>
    }

    return (
      <React.Fragment>
        <MenuBar />
        <Grid columns={3}>
          <Grid.Row>
            <Grid.Column></Grid.Column>
            <Grid.Column>
              <Card.Group>
              {
                posts.map((post) => {
                  return <Post post={post} />
                })
              }
              </Card.Group>
            </Grid.Column>
            <Grid.Column></Grid.Column>
          </Grid.Row>
        </Grid>
      </React.Fragment>
    );
  }
};

export default Newsfeed;
