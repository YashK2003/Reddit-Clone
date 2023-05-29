import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Homepg from "./components/homepage";
import Aboutpg from "./components/Aboutpage";
import Mainpg from "./components/mainpage";
import addpg from "./components/Addpage";
import NotFound from "./components/notfoundpage";
import registerpg from "./components/registerpage";
import loginpg from "./components/loginpage";
import Propg from "./components/profilepg";
import subgrepg from "./components/subgredditpg";
import sbgreformpg from "./components/sbgformpage";
import seperatesubgrepg from "./components/seperatesubgrepg";
import globalsubgrepg from "./components/globalsubgrepg";
import joinreqsubgrepg from "./components/joinreqsubgrepg";
import reportsubgrepg from "./components/reportedsubgrepg";
import usersubgrepg from "./components/userssubgrepg";
import statsubgrepg from "./components/statssubgrepg";
import redirectpg from "./components/redirectsubgrepage"
import addpost from "./components/addpostmodal"
import savedpostpage from "./components/savedpostpage";

function App()
{
  
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Homepg} />
        <Route exact path="/home" component={Homepg} />
        <Route exact path="/about" component={Aboutpg} />
        <Route exact path="/main" component={Mainpg} />
        <Route exact path="/add" component={addpg} />
        <Route exact path="/register" component={registerpg} />
        <Route exact path="/login" component={loginpg} />
        <Route exact path="/profile" component={Propg} />
        <Route exact path="/subg" component={subgrepg} />
        <Route exact path="/subgaddform" component={sbgreformpg} />
        <Route exact path="/globalsubg" component={globalsubgrepg} />
        <Route exact path="/savedposts" component={savedpostpage} />

        <Route exact path="/addpost" component={addpost} />

        <Route exact path="/subgre/:id" component={seperatesubgrepg} />
        <Route exact path="/subgre/:id/users" component={usersubgrepg} />
        <Route exact path="/subgre/:id/joinreq" component={joinreqsubgrepg} />
        <Route exact path="/subgre/:id/stats" component={statsubgrepg} />
        <Route exact path="/subgre/:id/report" component={reportsubgrepg} />
        <Route exact path="/globalsubgre/:id/" component={redirectpg} />

        <Route component={NotFound} />
      </Switch>
    </Router>
  );

}

export default App;
