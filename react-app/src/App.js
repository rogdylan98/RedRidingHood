import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import List from './components/lists/List';
import User from './components/PortfolioPage/User';
import { authenticate } from './store/session';
import SplashPage from './components/SplashPage/SplashPage';
import SplashPageNavBar from './components/NavBar/SplashPageNavBar';
import StockInfo from './components/StockInfo/StockInfo';
function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/us/en' exact={true}>
          <SplashPageNavBar />
          <SplashPage />
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/signup' exact={true}>
          <SignUpForm />
        </Route>

        <ProtectedRoute path='/lists/:listid' exact={true} >
          <NavBar />
          <List/>
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <NavBar />
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/stocks/:ticker' exact={true} >
          <NavBar />
          <StockInfo />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
