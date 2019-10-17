import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from '../views/HomePage/Home';
import AccountPage from '../views/AccountPage/AccountPage';
import { PrivateRoute } from '../components/PrivateRoute/PrivateRoute';

const RootRoutes = () => (
    <main id="Main">
        <Switch>
            <Route exact path='/' component={HomePage}/>
            <Route path="/:username" component={AccountPage}/>
            {/* ПРИВАТНЫЕ СТРАНИЦЫ (НУЖЕН ТОКЕН) */}
            <PrivateRoute path='/account' component={AccountPage}/>
        </Switch>
    </main>
);

export default RootRoutes;