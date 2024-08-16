import React from "react";
import { Routes as Switch, Route } from "react-router-dom";
import { Home } from "./home/Home";
import { Login } from "./login/Login";
import { ViewCampaign } from "./campaign/ViewCampaign";
import { NotFound } from "./404/NotFound";

export const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="">
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/campaign/:campaignId">
          <Route path="" element={<ViewCampaign />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Switch>
  );
};
