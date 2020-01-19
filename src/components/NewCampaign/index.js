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


        fetch("http://35.229.119.94/api/createpost", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: this.state.id,
                pic: this.state.picture,
                file: this.state.file[0]
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then(result =>
                this.setState(prevState => ({
                    listItems: [result, ...prevState.listItems]
                }))
            )
            .catch(error =>
                alert('Campaign Post Request Error ' + error)
            );


        event.preventDefault();
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


            </Container>
        );
    }



}