import React from 'react';
import MenuBar from './MenuBar'
import { Container, Divider, Grid, Header } from 'semantic-ui-react'
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
                    Software for Good
                  </Header>
                  <Divider />
                    <p>
                      After becoming a software engineer, I began to wonder if I had
                      made a mistake. Is the software that we build contributing to the
                      distance between us as humans? If "social networks" can lead to
                      our isolation, is there software that can bring us together? What
                      does that look like? Let's find out together.
                    </p>

                    <p>
                      Each week, I profile an organization/person/robot that is
                      building software for good. I ask them about their stack,
                      their impact, and the people they serve. I get to the heart
                      of their human impact, and try to understand what the world would
                      look like without their product. Together, let's embark on a journey
                      to understand, utilize, and create Software for Good.
                    </p>
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
