import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProgressBar from "react-bootstrap/ProgressBar";
import styles from "./CampaignFeed.module.css";

export default class CampaignCard extends Component {

    constructor(props) {
        super(props);

        this.state = { likes: "", picture: "" }


    }


    componentDidMount() {
        // fetch("http://127.0.0.1:5000/api/getpost?id=14")
        //     .then(response => {
        //         if (!response.ok) {
        //             throw Error(response.statusText);
        //         }
        //         return response.json();
        //     })
        //     .then(resp => {

        //         this.setState({ likes: resp[0].likes, picture: resp[1].pic_link });

        //     })
        //     .catch(error =>
        //         alert('Like and Image Request Error ' + error)
        //     );
    }




    render() {
        const percentageRaised = Math.round((this.props.campaign.data._raised / this.props.campaign.data._goal) * 100);
        return (
            <Row>

                <Col className={styles.campaignCard} sm={{ span: 8, offset: 2 }}>
                    <Card >
                        <Card.Img variant="top" src={"https://picsum.photos/id/1002/200/120"} />
                        <Card.Body>
                            <Card.Title>{this.props.campaign.data._title}</Card.Title>
                            <Card.Text>
                                {this.props.campaign.data._description}
                            </Card.Text>
                            <Row>
                                <Col sm={10}>
                                    <ProgressBar now={percentageRaised} />
                                    💵 ${this.props.campaign.raised} out of ${this.props.campaign.goal}
                                </Col>
                                <Col sm={2}>
                                    <Button onClick={() => this.props.handleDonate(this.props.campaign)} variant="primary">Donate</Button>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row >
        );
    }
}

