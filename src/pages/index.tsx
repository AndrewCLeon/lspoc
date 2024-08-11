import React from "react";
import { Routes as Switch, Route } from "react-router-dom";
import { Home } from "./home/Home";
import { ViewCampaign } from "./campaign/ViewCampaign";
import { CreateCharacter } from "./character/CreateCharacter";
import { UploadFiles } from "./files/UploadFiles";

export const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" element={<Home />} />
      <Route path="/campaign/:campaignId" element={<ViewCampaign />} />
      <Route
        path="/campaign/:campaignId/characters/create"
        element={<CreateCharacter />}
      />
      <Route
        path="/campaign/:campaignId/:characterId/files/upload"
        element={<UploadFiles />}
      />
      <Route path="/character/create" element={<CreateCharacter />} />
      <Route path="/files/upload" element={<UploadFiles />} />
    </Switch>
  );
};
