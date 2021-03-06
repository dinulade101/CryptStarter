import React, { Component } from "react";
import getWeb3 from "./getWeb3";

import { Route, Switch } from "react-router-dom";

import TopBar from "./components/TopBar"
import CampaignFeed from "./components/CampaignFeed";
import NewCampaign from "./components/NewCampaign";
import CryptFunding from "./contracts/CryptFunding.json";
import Campaign from "./contracts/Campaign.json";

import 'bootstrap/dist/css/bootstrap.min.css';

import "./App.css";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null, campaigns: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = CryptFunding.networks[networkId];
      const instance = new web3.eth.Contract(
        CryptFunding.abi,
        deployedNetwork && deployedNetwork.address,
      );

      const campaigns = [];

      instance.methods.getCampagins().call().then((campagins) => {
        campagins.forEach((campaignAddress) => {
          const campaign = new web3.eth.Contract(Campaign.abi, campaignAddress);
          campaign.methods.getDetails().call().then((cData) => {
            campaigns.push({ contract: campaign, data: cData });
            console.log(cData);
          });
        });
      });

      this.setState({campaign_data: campaigns, web3_new: web3})


      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);

      fetch("http://35.229.119.94/api/listposts", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }).then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      }).then((response) => {
        // self.state.campaigns = response;
        this.setState({ campaigns: response })
      })

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  // runExample = async () => {
  //   const { accounts, contract } = this.state;

  //   // Stores a given value, 5 by default.
  //   // await contract.methods.set(5).send({ from: accounts[0] });

  //   // Get the value from the contract to prove it worked.
  //   const response = await contract.methods.get().call();

  //   // Update state with the result.
  //   this.setState({ storageValue: response });
  // };

  render() {
    if (!this.state.web3 && false) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    if (!this.state.campaigns) {
      return <div>Loading campaigns</div>;
    }
    return (
      <React.Fragment>
        <TopBar />
        <Switch>
          <Route exact path="/" render={(routerProps) => (<CampaignFeed {...routerProps} {...this.state} />)} />
          <Route path="/NewCampaign" render={(routerProps) => (<NewCampaign {...routerProps} {...this.state} />)} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
