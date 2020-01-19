import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import ImageUploader from 'react-images-upload';

import "react-datepicker/dist/react-datepicker.css";


export default class NewCampaign extends Component {

    constructor(props) {
        super(props);
        this.state = {
            picture: NaN,
            file: NaN,
            title: "",
            description: "",
            goal: 0,
            date: new Date()
        }


        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }



    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();

        //const { accounts, contract } = this.props;
        this.props.contract.methods.createCampaign(Math.round(this.state.date.getTime() / 60000), this.state.goal, this.state.title, this.state.description).send({ from: this.props.accounts[0] });


        fetch("http://127.0.0.1:5000/api/createpost?id=5&pic_link=" + this.state.file[0], {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        })
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .catch(error =>
                alert('Campaign Post Request Error ' + error)
            );


    }

    handleDateChange(date) {
        this.setState({
            startDate: date
        });
    }

    onDrop(pic, f) {
        this.setState({
            picture: pic,
            file: f
        });
    }

    render() {
        return (
            <Container>
                <Row style={{ marginTop: 45 }} >
                    <Col>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group onChange={this.handleChange}>
                                <Form.Label>🤔Campaign Title</Form.Label>
                                <Form.Control name="title" placeholder="Catchy Title!" />
                            </Form.Group>

                            <Form.Group onChange={this.handleChange}>
                                <Form.Label>💸Fundraising Goal </Form.Label>
                                <Form.Control name="goal" placeholder="How much money do you need??" />
                            </Form.Group>

                            <Form.Group onChange={this.handleChange}>
                                <Form.Label>🎯Campaign Goal</Form.Label>
                                <Form.Control name="description" placeholder="What are you using the money for?!" as="textarea" rows="3" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>📅 End Date</Form.Label>
                                <br />
                                <DatePicker
                                    selected={this.state.date}
                                    onChange={this.handleDateChange}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>📸 Campaign Picture</Form.Label>
                                <ImageUploader
                                    singleImage={true}
                                    withPreview={true}
                                    withIcon={false}
                                    buttonText='Choose Image'
                                    onChange={this.onDrop}
                                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                    maxFileSize={5242880}
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                🚀Launch Campaign
                    </Button>
                        </Form>
                    </Col>
                </Row>
            </Container >
        );
    }



}