import React, { Component } from 'react'
import { Container, Header } from 'semantic-ui-react'

export class NotFound extends Component {
  render() {
    return (
      <Container textAlign="center">
        <Header as="h3">404 Not Found!</Header>
        <p>The page you are looking for does not exist.</p>
      </Container>
    )
  }
}

export default NotFound