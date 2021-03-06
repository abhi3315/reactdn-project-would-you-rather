import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'
import { handleInitialData } from '../actions/shared'
import Login from './Login'
import Home from './Home'
import PollQuestion from './PollQuestion'
import Nav from './Nav'
import NewQuestion from './NewQuestion'
import LeaderBoard from './LeaderBoard'
import NotFound from './NotFound'

class App extends Component {
  componentDidMount() {
    this.props.handleInitialData()
  }

  render() {
    const { authedUser } = this.props
    return (
      <Router>
        <div>
          {authedUser === null ?
            (<Route render={() => (
              <ContentGrid>
                <Login />
              </ContentGrid>
            )}
            />
            ) :
            (
              <Fragment>
                <Nav />
                <ContentGrid>
                  <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/add' component={NewQuestion} />
                    <Route path='/leaderboard' component={LeaderBoard} />
                    <Route path="/questions/bad_id" component={NotFound} />
                    <Route path='/question/:question_id' component={PollQuestion} />
                    <Route component={NotFound} />
                  </Switch>
                </ContentGrid>
              </Fragment>
            )}
        </div>
      </Router>
    )
  }
}

const ContentGrid = ({ children }) => (
  <Grid padded="vertically" columns={1} centered>
    <Grid.Row>
      <Grid.Column style={{ maxWidth: 550 }}>{children}</Grid.Column>
    </Grid.Row>
  </Grid>
)

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps, { handleInitialData })(App)
