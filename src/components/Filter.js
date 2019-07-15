import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Card from '@material-ui/core/Card';
import Typography from "@material-ui/core/Typography";
import { withStyles } from '@material-ui/core/styles';


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../action';

const classes = theme => ({
    formControl: {
        margin: theme.spacing.unit,
        width: "200px"
    },
    button: {
        padding: '2px 8px 2px 8px',
        border: '1px solid #f05e50',
        color: '#f05e50',
        fontSize: "12px",
        "&:hover": {
            backgroundColor: '#f05e50',
            color: "white",
            borderColor: '#f05e50'
        }
    },
    select: {
        "&:after": {
            borderColor: "red"
        }
    }
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

class DialogMenu extends React.Component {
    state = {
        open: false,
        name: [],
        nbr: 0,
        range: [4, 8, 12]
    };

    getOnlyCategories = data => {
        let ctg = [];
        data.map(movie => {
            if (ctg.indexOf(movie.category) === -1)
                ctg.push(movie.category);
            return '';
        })
        this.props.getServiceCategories(ctg);
    }

    handleChange = event => {
        this.setState({ name: event.target.value });
    };

    changeView = event => {
        this.props.setView(event.target.value);
        this.setState({ nbr: event.target.value });
    }
    handleClickOpen = () => {
        this.getOnlyCategories(this.props.base.movies);
        this.setState({ open: true });
    };

    handleCancel = () => {
        this.setState({ open: false });
    };

    handleConfirm = () => {
        this.props.setVisibleCategories(this.state.name);
        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;
        return (

            <Card style={{ padding: '10px' }}>
                <Grid container direction="row" justify="center" alignItems="flex-start" spacing={0}>

                    <Grid item xs={12} sm={6} md={5}>
                        <FormControl style={{ width: '90%' }} >
                            <InputLabel
                                ref={ref => { this.InputLabelRef = ref }}
                                htmlFor="select-multiple-checkbox"
                                style={{
                                    color: "#ff978a",
                                    transform: "none",
                                    fontSize: "10px"
                                }}
                            >
                                Categories
              </InputLabel>
                            <Select
                                className={classes.select}
                                multiple
                                value={this.state.name}
                                onChange={this.handleChange}
                                input={<Input id="select-multiple-checkbox" />}
                                renderValue={selected => selected.join(', ')}
                                MenuProps={MenuProps}
                            >
                                {this.props.base.categories.map(name => (
                                    <MenuItem key={name} value={name} >
                                        <Checkbox
                                            checked={this.state.name.indexOf(name) > -1}
                                            color='default'
                                        />
                                        <ListItemText primary={name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <FormControl style={{ width: '90%' }} >
                            <InputLabel htmlFor="age-simple"
                                style={{
                                    color: "#ff978a",
                                    transform: "none",
                                    fontSize: "10px"
                                }}>Pages</InputLabel>
                            <Select
                                className={classes.select}
                                value={this.state.nbr}
                                onChange={this.changeView}
                                inputProps={{
                                    name: 'age',
                                    id: 'age-simple',
                                }}
                            >
                                {this.state.range.map(nbr => {
                                    return <MenuItem key={nbr} value={nbr}> {nbr} </MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={2} style={{ paddingTop: '10px' }}>
                        <Typography align="center">
                            <Button onClick={this.handleConfirm} className={classes.button} >
                                Search
                            </Button>
                        </Typography>
                    </Grid>

                </Grid>
            </Card>
        );
    }
}

const mapStateToProps = state => ({
    base: state.base,
})

const mapDispatchToProps = dispatch => ({
    setVisibleCategories: bindActionCreators(actions.setVisibleCategories, dispatch),
    getServiceCategories: bindActionCreators(actions.getServiceCategories, dispatch),
    setView: bindActionCreators(actions.setView, dispatch),

})

export default withStyles(classes)(
    connect(mapStateToProps, mapDispatchToProps)(DialogMenu)
);