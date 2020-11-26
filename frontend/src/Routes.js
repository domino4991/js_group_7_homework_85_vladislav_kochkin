import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import ArtistsPage from "./containers/ArtistsPage/ArtistsPage";
import AlbumsPage from "./containers/AlbumsPage/AlbumsPage";
import TracksPage from "./containers/TracksPage/TracksPage";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import TrackHistory from "./containers/TrackHistory/TrackHistory";
import CreateNewArtist from "./containers/CreateNewArtist/CreateNewArtist";
import CreateNewAlbum from "./containers/CreateNewAlbum/CreateNewAlbum";
import CreateNewTrack from "./containers/CreateNewTrack/CreateNewTrack";
import AdminPage from "./containers/AdminPage/AdminPage";
import UserProfile from "./containers/UserProfile/UserProfile";

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
                <ProtectedRoute
                    path='/add-new-album'
                    exact
                    component={CreateNewAlbum}
                    isAllowed={user}
                    redirectTo='/'
                />
                <ProtectedRoute
                    path='/add-new-track'
                    exact
                    component={CreateNewTrack}
                    isAllowed={user}
                    redirectTo='/'
                />
                <ProtectedRoute
                    path='/admin'
                    exact
                    component={AdminPage}
                    isAllowed={user && user.role === 'admin'}
                    redirectTo='/'
                />
                <ProtectedRoute
                    path='/profile'
                    exact
                    component={UserProfile}
                    isAllowed={user && user.role === 'user'}
                    redirectTo='/'
                />
                <Route render={() => <h1 style={{textAlign: 'center'}}>404 not found</h1>} />
            </Switch>
        </Layout>
    );
};

export default Routes;