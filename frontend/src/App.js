// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotsList from "./components/SpotsList";
import SingleSpotComponent from "./components/SingleSpot";
import Trips from "./components/Trips";
import SpotSuccess from "./components/SpotSuccess";
import SearchResult from "./components/SearchResult";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  

  return (
    <>

      <Navigation isLoaded={isLoaded} />
      {isLoaded && (

        <Switch>
          <Route exact path="/">
            <SpotsList />
          </Route>
          <Route path="/spots/:spotId">
            <SingleSpotComponent />
          </Route>
          <Route path="/profile">
            <Trips />
          </Route>
          <Route exact path="/success">
            <SpotSuccess />
          </Route>
          <Route path="/search/:keyword">
            <SearchResult />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;