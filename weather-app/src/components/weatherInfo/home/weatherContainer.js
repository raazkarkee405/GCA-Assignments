import { CircularProgress } from '@material-ui/core'
import React, { Component } from 'react'
import { WeatherAPI } from '../../../wetherApi'
import Navbar from '../layouts/navbar'
import CurrentWeatherCard from './currentWeatherCard'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


class WeatherContainer extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             city: "Kathmandu",
             weatherData:{},
             isLoading:true,
        }
    }

    componentDidMount() {
        this.getWeatherData();
    }

    getWeatherData = () =>{
        let self = this;
        WeatherAPI.getCurrentWeatherData(this.state.city)
        .then(res=>{
          //  console.log(res.data);
            self.setState({
                weatherData:res.data,
                isLoading:false
            })
        })
    }

    handleChange=(event)=>{
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onClick = (e) => {
        e.preventDefault();
        this.getWeatherData();
    }
    
    render() {
        return (
            <div>
                <Navbar /> 
               
                <div align="center"style={{margin:"auto", marginTop:"40px"}}>
                       <TextField id="standard-basic" label="Enter City" name="city" onChange={this.handleChange}/>
                         <Button 
                            variant="contained" 
                            color="primary"
                            type="button"
                            onClick={this.onClick}
                        >
                             Search
                         </Button>
                </div>
                {
                this.state.isLoading ? 
                <CircularProgress/> :
                    <div>
                       {<CurrentWeatherCard data={this.state.weatherData} />}
                    </div>
                }
            </div>
        )
    }
}

export default WeatherContainer;
