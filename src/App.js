import React from 'react';
import { Route, Switch } from "react-router-dom";

import TopBar from "./components/TopBar"
import CampaignFeed from "./components/CampaignFeed";
import NewCampaign from "./components/NewCampaign";

import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <React.Fragment>
      <TopBar />
      <Switch>
        <Route exact path="/" component={CampaignFeed} />
        <Route path="/NewCampaign" component={NewCampaign} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
