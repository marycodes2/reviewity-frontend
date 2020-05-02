import React from 'react';
import MenuBar from './MenuBar'
import { Button, Container, Divider, Grid, Header } from 'semantic-ui-react'
import CSSTransition from 'react-transition-group/CSSTransition';

class MainPage extends React.Component {
  state = {
    loaded: false,
  }

  componentDidMount() {
    this.setState({ loaded: true })
  }

  render() {
    const { loaded } = this.state;

    return (
      <React.Fragment>
        <MenuBar />
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <CSSTransition
                classNames="star"
                in={loaded}
                timeout={7000}
                unmountOnExit
              >
                <Container
                  textAlign='center'
                  className='title'
                >
                  <Header as='h1'>
                    Reviewity
                  </Header>
                  <Divider />
                    <p>
                      personal reviews. currated community.
                    </p>

                  <Button>
                    Get Started
                  </Button>
                </Container>
              </CSSTransition>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </React.Fragment>
    );
  }
};

export default MainPage;
