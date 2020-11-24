import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import ArtistsPage from "./containers/ArtistsPage/ArtistsPage";
import AlbumsPage from "./containers/AlbumsPage/AlbumsPage";
import TracksPage from "./containers/TracksPage/TracksPage";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import TrackHistory from "./containers/TrackHistory/TrackHistory";
import PropTypes from 'prop-types';
import CreateNewArtist from "./containers/CreateNewArtist/CreateNewArtist";

const ProtectedRoute = ({isAllowed, redirectTo, ...props}) => {
    return isAllowed ?
        <Route {...props} /> :
        <Redirect to={redirectTo} />
};

const Routes = ({user}) => {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={ArtistsPage} />
                <Route path="/albums" exact component={AlbumsPage} />
                <Route path="/tracks" exact component={TracksPage} />
                <ProtectedRoute
                    path="/register"
                    exact
                    component={Register}
                    isAllowed={!user}
                    redirectTo='/'
                />
                <ProtectedRoute
                    path="/login"
                    exact
                    component={Login}
                    isAllowed={!user}
                    redirectTo='/'
                />
                <ProtectedRoute
                    path="/track_history"
                    exact
                    component={TrackHistory}
                    isAllowed={user}
                    redirectTo='/'
                />
                <ProtectedRoute
                    path='/add-new-artist'
                    exact
                    component={CreateNewArtist}
                    isAllowed={user}
                    redirectTo='/'
                />
                <Route render={() => <h1 style={{textAlign: 'center'}}>404 not found</h1>} />
            </Switch>
        </Layout>
    );
};

Routes.propTypes = {
    user: PropTypes.any.isRequired
};

export default Routes;