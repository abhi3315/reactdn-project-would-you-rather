import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {
    Segment,
    Header,
    Grid,
    Image,
    Button
} from 'semantic-ui-react'

export class PollCards extends Component {
    render() {
        const { question, author } = this.props
        return (
            <Segment.Group>
                <Header as="h4"
                    textAlign="left"
                    block
                    attached="top"
                    style={{ borderTop: '3px solid teal' }}
                >
                    {author.name} asks:
                </Header>
                <Grid divided padded>
                    <Grid.Row>
                        <Grid.Column width={5}>
                            <Image src={author.avatarURL} />
                        </Grid.Column>
                        <Grid.Column width={11}>
                            <Fragment>
                                <Header as="h5" textAlign="left">
                                    Would you rather
                                </Header>
                                <p style={{ textAlign: 'left' }}>
                                    {question.optionOne.text}
                                    <br />
                                    or...
                                </p>
                                <Button
                                    color="teal"
                                    size="tiny"
                                    fluid
                                    basic
                                    style={{borderRadius:"5px"}}
                                    content="View Poll"
                                    attached="bottom"
                                />
                            </Fragment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment.Group>
        )
    }
}

function mapStateToProps(
    { users, questions, authedUser },
    { match, question_id }
) {
    let question,
        author,
        badPath = false
    if (question_id !== undefined) {
        question = questions[question_id]
        author = users[question.author]
    } else {
        const { question_id } = match.params
        question = questions[question_id]
        const user = users[authedUser]

        if (question === undefined) {
            badPath = true
        } else {
            author = users[question.author]
        }
    }

    return {
        badPath,
        question,
        author
    }
}

export default connect(mapStateToProps)(PollCards)