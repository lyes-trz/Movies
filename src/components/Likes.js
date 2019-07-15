import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ThumbUpAlt from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAlt from '@material-ui/icons/ThumbDownAlt';
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';


const styles = theme => ({
    main: {
        display: 'inline-flex'
    },
    button: {
        backgroundColor: "transparent",
        "&:hover": {
            backgroundColor: "transparent"
        },

    },
    buttonLike: {
        fontSize: '20px',
        color: '#c3c3c3',
        "&:hover": {
            color: "#f05e50"
        },
        "&:active": {
            backgroundColor: "transparent"
        }
    },
    buttonDislike: {
        fontSize: '20px',
        marginTop: '4px',
        color: '#c3c3c3',
        "&:hover": {
            color: "#f05e50"
        }
    },
    LikesNum: {
        fontSize: '11px',
        marginTop: '5px',
        marginLeft: '3px',
        color: '#c3c3c3'
    }
});

class LikeDislike extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Like: 0,
            dislikes: 0
        };

    }
    dislikeMovie = () => {
        const newMovies = this.props.base.movies;
        const newsLikes = this.props.movie.dislikes + 1;
        const pos = newMovies.indexOf(this.props.movie);
        newMovies[pos] = {
            ...this.props.movie,
            dislikes: newsLikes
        }
        this.props.getServiceData(newMovies);
    }


    likeMovie = () => {
        const newMovies = this.props.base.movies;
        const newsLikes = this.props.movie.likes + 1;
        const pos = newMovies.indexOf(this.props.movie);
        newMovies[pos] = {
            ...this.props.movie,
            likes: newsLikes
        }
        this.props.getServiceData(newMovies);
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.main}>

                <IconButton
                    disableRipple={true}
                    className={classes.button} onClick={this.likeMovie}>
                    <ThumbUpAlt className={classes.buttonLike} />
                    <Typography className={classes.LikesNum} >{this.props.movie.likes}</Typography>
                </IconButton>

                <IconButton disableRipple={true} className={classes.button} onClick={this.dislikeMovie}>
                    <ThumbDownAlt className={classes.buttonDislike} />
                    <Typography className={classes.LikesNum}>{this.props.movie.dislikes}</Typography>
                </IconButton>

            </div>
        )
    }
}

const mapStateToProps = state => ({
    base: state.base,
})

const mapDispatchToProps = dispatch => ({
    getServiceData: bindActionCreators(actions.getServiceData, dispatch),
})

export default withStyles(styles)(
    connect(mapStateToProps, mapDispatchToProps)(LikeDislike)
);