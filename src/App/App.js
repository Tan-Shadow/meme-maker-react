import React from "react";
import { Meme } from "../Meme/Meme";
import { Switch, Route } from "react-router";
import { MemeGenerated } from "../MemeGenerated/MemeGenerated";

export const App = () => {
  return (
    <div>
      <h1 style={{color: "#7cffcb"} }>tanShadow</h1>
      <Switch>
        <Route exact path="/">
          <Meme />
        </Route>
        <Route path="/generated">
          <MemeGenerated />
        </Route>
      </Switch>
    </div>
  );
};
