import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid/Grid";



export default class CurrentWeatherCard extends Component {
    render() {
        let weather = this.props.data;
        const iconUrl = "http://openweathermap.org/img/wn/" + `${weather.weather[0].icon}` + ".png";
        return (
            <div>
                {
                <Grid container
                 spacing={0}
                 alignItems="center"
                 justify="center"
                 style={{ minHeight: "50vh"}}>
                <Card>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {weather.name}, {weather.sys.country}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" >
            {new Date().toLocaleDateString()}
          </Typography>
          <Typography variant="h4" color="textPrimary">
           {weather.main.temp}°C
           <img src={iconUrl} className="weather-icon" alt="" style={{paddingLeft: "100px"}}/> 
          </Typography>
          <Typography variant="h6" color="textSecondary" component="p">
            {weather.weather[0].description}
          </Typography>
          <Typography variant="body2" color="textPrimary" component="p">
          <Grid container  spacing={2} style={{marginTop:20}}>
                       <Grid  item xs="3" sm="2" style={{margin:10}}>
                           <div>Sunrise</div>
                           <div>{new Date(weather.sys.sunrise * 1000).toLocaleString()}</div>
                       </Grid>
                       <Grid  item xs="3" sm="2" style={{margin:10}}>
                           <div>Sunset</div>
                           <div>{new Date(weather.sys.sunset * 1000).toLocaleString()}</div>
                       </Grid>
                       <Grid  item xs="3" sm="2" style={{margin:10}}>
                           <div>Max/Min Temp</div>
                           <div>{weather.main.temp_max} /{""} {weather.main.temp_min} <sup>o</sup>C</div>
                       </Grid>
                       <Grid  item xs="3" sm="2" style={{margin:10}}>
                           <div>Pressure</div>
                           <div>{weather.main.pressure} {""}hPa</div>
                       </Grid>
                       <Grid  item xs="3" sm="2" style={{margin:10}}>
                           <div>Humidity</div>
                           <div>{weather.main.humidity} {""} %</div>
                       </Grid>
                   </Grid>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
                </Grid>
                }
            </div>
        )
    }
}
