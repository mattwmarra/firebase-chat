import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';
import Header from './components/Header';
import styled from 'styled-components';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from './firebase'
import Login from './components/Login';

function App() {
  const [user, loading] = useAuthState(auth);
  if (loading) {
    return (
      <LoadingScreen>
        <LoadingScreenContent>
          <h3>Loading</h3>
        </LoadingScreenContent>
      </LoadingScreen>
    )
  }
  return (
    <Router>
      {!user ? (
        <Login />
      ) : (
        <>
          <Header/>
          <AppBody>
            <Sidebar />
            <Switch>
                <Route path="/" exact >
                  <Chat />
                </Route>
              </Switch>
          </AppBody>
        </>
      )}

    </Router>
  );
}

export default App;


const AppBody = styled.div`
  display: flex;
  height:100vh;
  width: 100%;
`;

const LoadingScreen = styled.div`

`;
const LoadingScreenContent = styled.div`

`;