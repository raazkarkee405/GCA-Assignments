import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom'
import WeatherContainer from './components/weatherInfo/home/weatherContainer'

export default class Routes extends Component {
    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        //Route path for the weather
                        <Route path="/" exact component={WeatherContainer} >
                       </Route>
                    </Switch>
                </Router>
            </div>
        )
    }
}
