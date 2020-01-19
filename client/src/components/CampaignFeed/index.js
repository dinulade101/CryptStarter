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

        console.log("Amir output:");
        console.log(props);

        console.log(typeof(props));

        this.state = {
            showModal: false,
            currentDonateTitle: "",
            currentDonateID: "",
            donationAmount: "",
            campaigns: Object.values(props)
        }


        this.handleDonate = this.handleDonate.bind(this);
        this.handleConfirmDonate = this.handleConfirmDonate.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleDonationAmount = this.handleDonationAmount.bind(this);
    }

    setCampaigns(_campaigns) {
        this.setState({ campaigns: _campaigns});
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
        console.log('_++________type:');
        const {
            campaigns, showModal, currentDonateTitle
        } = this.state;
        console.log(campaigns)

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