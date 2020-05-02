import React from 'react';
import MenuBar from './MenuBar'
import Post from './Post'
import { Button, Card, Divider, Grid, Header } from 'semantic-ui-react'

class Newsfeed extends React.Component {
  state = {
    posts: [
      {
        author: "Mary",
        subject: "Fitness",
        content: "What do you think of obe?",
        comments: [
          {
            author: "Joseph",
            content: "ADORE THEM",
          }
        ],
      }
    ],
  }

  componentDidMount() {
  }

  render() {
    const { posts } = this.state;

    return (
      <React.Fragment>
        <MenuBar />
        <Grid columns={3}>
          <Grid.Row>
            <Grid.Column></Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={4}>
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
