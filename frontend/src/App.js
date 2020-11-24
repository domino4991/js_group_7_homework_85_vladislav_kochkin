import React from "react";
import './App.css';
import Routes from "./Routes";
import {useSelector} from "react-redux";

const App = () => {
  const {user} = useSelector(state => state.users);
  return (
    <Routes user={user} />
  );
}

export default App;
