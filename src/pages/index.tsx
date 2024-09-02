import React from 'react';
import { Routes as Switch, Route } from 'react-router-dom';
import { Home } from './home/Home';
import { Login } from './login/Login';
import { PasswordReset } from './passwordReset/PasswordReset';
import { ViewCampaign } from './campaign/ViewCampaign';
import { NotFound } from './404/NotFound';
import { RoutePaths } from '../enums/RoutePaths';

export const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="">
        <Route path={RoutePaths.Home} element={<Home />} />
        <Route path={RoutePaths.Login} element={<Login />} />
        <Route path={RoutePaths.PasswordReset} element={<PasswordReset />} />
        <Route path={RoutePaths.ViewCampaign}>
          <Route path="" element={<ViewCampaign />} />
        </Route>
        <Route path={RoutePaths.NotFound} element={<NotFound />} />
      </Route>
    </Switch>
  );
};
