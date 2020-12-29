import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom'
import Home from './components/Home/home'

export default class Routes extends Component {
    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        //Route path 
                        {/* <Route path="/" exact component={SignIn} />
                        <Route path="/register" exact component={Register} /> */}
                        <Route path="/home" exact component={Home} />
                    </Switch>
                </Router>
            </div>
        )
    }
}