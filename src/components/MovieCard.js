import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Cancel from '@material-ui/icons/Cancel';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Likes from './Likes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../action';


const styles = theme => ({
    card: {
        width: 240,
        height: 330,
        margin: 10,
    },
    cardContent: {
        display: 'inline-flex'
    },
    actions: {
        display: 'flex',
    },
    ratio: {
        width: '100%',
        marginTop: '-5px'
    },
    linearColorPrimary: {
        backgroundColor: '#d0d0d0',
    },
    linearBarColorPrimary: {
        backgroundColor: '#f05e50',
    },

    media: {
        height: 220,
    },

    BtnCancel: {
        position: 'absolute',
        top: '-8px',
        right: '-8px',
        color: 'white',
        opacity: 0.5,
        "&:hover": {
            opacity: 1,
            color: 'white',
            backgroundColor: "transparent"
        }
    }
});

class RecipeReviewCard extends React.Component {
    value = (this.props.movie.likes / (this.props.movie.dislikes + this.props.movie.likes)) * 100;
    state = {
        expanded: false,
        completed: this.value,
        buffer: 100
    };

    componentDidUpdate() {
        const newValue = (this.props.movie.likes / (this.props.movie.dislikes + this.props.movie.likes)) * 100;
        if (newValue !== this.state.completed) {
            this.setState({ completed: newValue });
        }
    }

    findMovie = (movie) => {
        let newMovies = [];
        this.props.base.movies.map(elem => {
            if (elem.id !== movie.id) {
                newMovies.push(elem);
            }
            return '';
        });
        return (newMovies);
    }

    handleClose = () => {
        const newMovies = this.findMovie(this.props.movie);
        this.props.getServiceData(newMovies);

    };


    render() {
        const { classes } = this.props;

        return (
            <Card className={classes.card}>

                <CardActionArea style={{ position: 'relative' }}>

                    <CardMedia
                        className={classes.media}
                        image={this.props.movie.image}
                        title={this.props.movie.title}
                    />
                    <IconButton
                        onClick={this.handleClose}
                        className={classes.BtnCancel}
                    >
                        <Cancel />
                    </IconButton>
                </CardActionArea>


                <CardContent>

                    <Typography style={{ fontSize: '20px', color: '#797979', marginTop: '-10px' }}>{this.props.movie.title}</Typography>

                    <Typography style={{ fontSize: '10px', color: '#f05e50', marginTop: '-2px', marginBottom: '7px' }}>{this.props.movie.category}</Typography>

                    <Likes movie={this.props.movie} />
                    <LinearProgress
                        className={classes.ratio}
                        variant="buffer"
                        value={this.state.completed}
                        valueBuffer={this.state.buffer}
                        classes={{ colorPrimary: classes.linearColorPrimary, barColorPrimary: classes.linearBarColorPrimary }}
                    />

                </CardContent>
            </Card>
        );
    }
}

RecipeReviewCard.propTypes = {
    classes: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
    base: state.base,
})

const mapDispatchToProps = dispatch => ({
    getServiceData: bindActionCreators(actions.getServiceData, dispatch),
})


export default withStyles(styles)(
    connect(mapStateToProps, mapDispatchToProps)(RecipeReviewCard)
);