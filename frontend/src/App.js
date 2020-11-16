import React from "react";
import './App.css';
import ArtistsPage from "./containers/ArtistsPage/ArtistsPage";
import Layout from "./components/Layout/Layout";
import {Route, Switch} from "react-router-dom";
import AlbumsPage from "./containers/AlbumsPage/AlbumsPage";
import TracksPage from "./containers/TracksPage/TracksPage";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import TrackHistory from "./containers/TrackHistory/TrackHistory";

const App = () => {
  return (
    <Layout>
      <Switch>
          <Route path="/" exact component={ArtistsPage} />
          <Route path="/albums" exact component={AlbumsPage} />
          <Route path="/tracks" exact component={TracksPage} />
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
          <Route path="/track_history" exact component={TrackHistory} />
          <Route render={() => <h1 style={{textAlign: 'center'}}>404 not found</h1>} />
      </Switch>
    </Layout>
  );
}

export default App;
