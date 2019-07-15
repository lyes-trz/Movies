import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Movieslogo from '../assets/Movies-logo.png';


const Header = connect(state => ({
    base: state.base,
}))((props) => (
    <AppBar position="static" style={{ backgroundColor: 'white' }}>
        <Toolbar variant="dense">
            <img src={Movieslogo} alt="Movieslogo" style={{ width: '120px', height: 'auto' }} />
        </Toolbar>
    </AppBar>
))

export default withRouter(Header)