import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
    Segment,
    Header,
    Grid,
    Image,
    Button,
    Form,
    Radio
} from 'semantic-ui-react'

class PollQuestion extends Component {
    state = {
        value: ''
    }

    handleChange = (e, { value }) => this.setState({ value })

    handleSubmit = e => {
        e.preventDefault()
        if (this.state.value !== '') {
            const { authUser, question, handleSaveQuestionAnswer } = this.props
            handleSaveQuestionAnswer(authUser, question.id, this.state.value)
        }
    }

    render() {
        const { question, author } = this.props
        const disabled = this.state.value === '' ? true : false
        return (
            <Segment.Group>
                <Header as="h4"
                    textAlign="left"
                    block
                    attached="top"
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
                                <Header as="h4" textAlign="left">
                                    Would you rather
                                </Header>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Field>
                                        <Radio
                                            label={question.optionOne.text}
                                            name="radioGroup"
                                            value="optionOne"
                                            checked={this.state.value === 'optionOne'}
                                            onChange={this.handleChange}
                                        />
                                        <br />
                                        <Radio
                                            label={question.optionTwo.text}
                                            name="radioGroup"
                                            value="optionTwo"
                                            checked={this.state.value === 'optionTwo'}
                                            onChange={this.handleChange}
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <Button
                                            color="green"
                                            size="tiny"
                                            fluid
                                            positive
                                            disabled={disabled}
                                            content="Submit"
                                        />
                                    </Form.Field>
                                </Form>
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

export default connect(
    mapStateToProps
)(PollQuestion)