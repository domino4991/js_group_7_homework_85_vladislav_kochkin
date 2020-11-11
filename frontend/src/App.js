import React from "react";
import './App.css';
import ArtistsPage from "./containers/ArtistsPage/ArtistsPage";
import Layout from "./components/Layout/Layout";
import {Route, Switch} from "react-router-dom";
import AlbumsPage from "./containers/AlbumsPage/AlbumsPage";
import TracksPage from "./containers/TracksPage/TracksPage";

const App = () => {
  return (
    <Layout>
      <Switch>
          <Route path="/" exact component={ArtistsPage} />
          <Route path="/albums" exact component={AlbumsPage} />
          <Route path="/tracks" exact component={TracksPage} />
          <Route render={() => <h1 style={{textAlign: 'center'}}>404 not found</h1>} />
      </Switch>
    </Layout>
  );
}

export default App;
