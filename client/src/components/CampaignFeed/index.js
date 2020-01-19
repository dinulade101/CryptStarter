import React, { Component } from 'react';
import Container from "react-bootstrap/Container";
import CampaignCard from './CampaignCard';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

export default class CampaignFeed extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            currentDonateTitle: "",
            currentDonateID: "",
            donationAmount: "",
            campaigns: [{
                title: "New Bridge in the South East",
                goal: 8000,
                raised: 5800,
                description: "Consectetur quis anim ullamco laboris in nulla ipsum adipisicing sit laborum laborum occaecat dolore. Nisi amet sint eu fugiat esse in voluptate officia labore eu. Occaecat elit consequat eu voluptate. Aute ea in proident nostrud occaecat. Enim excepteur commodo culpa nulla. Consectetur enim eiusmod elit sunt reprehenderit in ut. Duis id elit velit sunt nulla.",
                id: 4
            }, {
                title: "Another project",
                goal: 9000,
                raised: 1700,
                description: "Cillum tempor incididunt adipisicing ea sit sit officia nulla. Sunt proident ea proident nulla. Velit quis enim occaecat nostrud cillum sunt culpa sit mollit consectetur officia nostrud. In officia sunt reprehenderit sunt eiusmod sint non duis nisi magna amet consequat.",
                id: 5
            }, {
                title: "Another one",
                goal: 1200,
                raised: 600,
                description: "Nisi minim incididunt culpa labore pariatur pariatur non occaecat occaecat ex esse. In fugiat ex amet ut labore nostrud ex voluptate aute ipsum duis cupidatat elit sit. In incididunt minim culpa magna laborum minim sit. Quis fugiat consectetur non ea aliquip Lorem. Voluptate cupidatat quis mollit qui ut qui commodo. Culpa sint do aute occaecat ea.",
                id: 6
            }]
        }


        this.handleDonate = this.handleDonate.bind(this);
        this.handleConfirmDonate = this.handleConfirmDonate.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleDonationAmount = this.handleDonationAmount.bind(this);
    }

    componentDidMount() {

    }

    handleDonate(campaign) {
        this.setState({ showModal: true, currentDonateTitle: campaign.title, currentDonateID: campaign.id })

    }

    handleConfirmDonate() {
        this.setState({ showModal: false })
    }

    handleCancel() {
        this.setState({ showModal: false, donationAmount: "" })
    }

    handleDonationAmount(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        const {
            campaigns, showModal, currentDonateTitle
        } = this.state;
        return (
            <Container>
                {campaigns.map(campaign => (
                    <CampaignCard
                        key={campaign.id}
                        campaign={campaign}
                        handleDonate={this.handleDonate}
                    />
                ))}
                <Modal
                    show={showModal}
                    onHide={this.handleCancel}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            {currentDonateTitle}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <InputGroup onChange={this.handleDonationAmount} className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>$</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl name="donationAmount" aria-label="Amount (to the nearest dollar)" />
                            <InputGroup.Append>
                                <InputGroup.Text>.00</InputGroup.Text>
                            </InputGroup.Append>
                            <InputGroup.Append>
                                <Button onClick={this.handleConfirmDonate} variant="outline-primary">Confirm Donation</Button>
                            </InputGroup.Append>
                        </InputGroup>

                    </Modal.Body>



                </Modal>

            </Container>
        );
    }



}