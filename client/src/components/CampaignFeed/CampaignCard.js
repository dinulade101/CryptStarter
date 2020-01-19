import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProgressBar from "react-bootstrap/ProgressBar";
import styles from "./CampaignFeed.module.css";

export default function CampaignCard({ campaign, handleDonate }) {

    const percentageRaised = Math.round((campaign.raised / campaign.goal) * 100);

    return (
        <Row>
            <Col className={styles.campaignCard} sm={{ span: 8, offset: 2 }}>
                <Card >
                    <Card.Img variant="top" src="https://picsum.photos/200/150
" />
                    <Card.Body>
                        <Card.Title>{campaign.title}</Card.Title>
                        <Card.Text>
                            {campaign.description}
                        </Card.Text>
                        <Row>
                            <Col sm={8}>
                                <ProgressBar now={percentageRaised} />
                            </Col>
                            <Col sm={2}>
                                Likes
                            </Col>
                            <Col sm={2}>
                                <Button onClick={() => handleDonate(campaign)} variant="primary">Donate</Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}

