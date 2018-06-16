import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Home from './components/Home';
import Create from './components/Create';

const Routes = () => (
    <Router>
        <div>
            <NavigationBar />
            <Route exact path="/" component={Home} />
            <Route path="/new" component={Create} />
        </div>
    </Router>
);

export default Routes;
