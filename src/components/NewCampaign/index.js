import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import ImageUploader from 'react-images-upload';

import "react-datepicker/dist/react-datepicker.css";


export default class NewCampaign extends Component {

    constructor(props) {
        super(props);
        this.state = {
            picture: NaN,
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
        alert('A name was submitted: ' + this.state.formBasicEmail);
        event.preventDefault();
    }

    handleDateChange(date) {
        this.setState({
            startDate: date
        });
    }

    onDrop(pic) {
        this.setState({
            picture: pic,
        });
    }

    render() {
        return (
            <Container>

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


            </Container>
        );
    }



}