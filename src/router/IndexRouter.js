import React from "react";

import { HashRouter, Redirect, Route, Switch } from "react-router-dom";

import Login from "../view/login/Login";
import Detail from "../view/news/Detail";
import News from "../view/news/News";
import Index from "../view/index/Index";

import Cookies from "js-cookie";

export default function IndexRouter() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/news" component={News} />
        <Route path="/detail/:id" component={Detail} />
        <Route
          path="/"
          render={() => {
            return Cookies.get("zjjtoken") ? (
              <Index></Index>
            ) : (
              <Redirect to="/login" />
            );
          }}
        />
      </Switch>
    </HashRouter>
  );
}
