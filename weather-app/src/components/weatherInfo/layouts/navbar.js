import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloudIcon from '@material-ui/icons/Cloud';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state={
        }
    }
    render() {
        return (
            <div>
                <AppBar position="static">
                <Toolbar>
                    <CloudIcon style={{color: 'orange', height: "40px"}}/>
                    &nbsp;
                <Typography variant="h6" noWrap>
                    Weather Data
                </Typography>
                </Toolbar>
            </AppBar>
            </div>
        )
    }
}

export default Navbar;
