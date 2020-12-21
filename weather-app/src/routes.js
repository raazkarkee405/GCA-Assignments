import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom'
import WeatherContainer from './components/weatherInfo/home/weatherContainer'

export default class Routes extends Component {
    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        //Route path for the weather
                        <Route path="/weather" exact>
                            <WeatherContainer />
                        </Route>
                    </Switch>
                </Router>
            </div>
        )
    }
}
