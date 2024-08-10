import React from "react";
import { Routes as Switch, Route } from "react-router-dom";
import { Home } from "./home/Home";
import { CreateCharacter } from "./character/CreateCharacter";

export const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" element={<Home />} />
      <Route path="/character/create" element={<CreateCharacter />} />
    </Switch>
  );
};
