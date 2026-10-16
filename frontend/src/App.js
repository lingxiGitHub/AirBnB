// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, useLocation } from "react-router-dom";
import * as sessionActions from "./store/session";
import { getFavorites } from "./store/favorites";
import Navigation from "./components/Navigation";
import SpotsList from "./components/SpotsList";
import SingleSpotComponent from "./components/SingleSpot";
import Trips from "./components/Trips";
import Wishlists from "./components/Wishlists";
import SpotSuccess from "./components/SpotSuccess";
import SearchResult from "./components/SearchResult";
import NotFound from "./components/NotFound";

function App() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  // Keep wishlist hearts in sync with whoever is logged in
  useEffect(() => {
    if (sessionUser) dispatch(getFavorites());
  }, [dispatch, sessionUser]);

  // Start each page at the top, like a normal site navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="app">
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <SpotsList />
          </Route>
          <Route path="/spots/:spotId">
            <SingleSpotComponent />
          </Route>
          <Route exact path="/trips">
            <Trips />
          </Route>
          <Route exact path="/wishlists">
            <Wishlists />
          </Route>
          <Route exact path="/success">
            <SpotSuccess show />
          </Route>
          <Route path="/search/:keyword">
            <SearchResult />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      )}
    </div>
  );
}

export default App;
