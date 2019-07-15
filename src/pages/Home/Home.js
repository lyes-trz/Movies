import React from 'react'
import './Home.css'
import { movies$ } from './../../movies'
import MovieCard from './../../components/MovieCard';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Filter from '../../components/Filter'

const classes = theme => ({
  root: {
    flexGrow: 1
  },

  button: {
    margin: '5px',
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

  SelectComponent: {
    padding: '10px 10% 10px 10%',
    marginBottom: '20px',
    marginTop: '20px'
  }
})

class Home extends React.Component {
  state = {
    page: 1,
  }

  componentDidMount() {
    movies$.then(data => {
      this.props.getServiceData(data);
      this.props.setView(4);
    }).catch(console.log("error"));
  }

  showMovies = () => {
    const nbrView = this.props.base.nbrView;
    const baseMovies = this.props.base.movies;
    const categories = this.props.base.visiblesCategories;
    let movies = [];
    let count = (nbrView * this.state.page) - nbrView;
    while (count < nbrView * this.state.page && count < baseMovies.length) {
      if (categories.length === 0 ||
        (categories.length !== 0 && categories.indexOf(baseMovies[count].category) > -1)) {
        movies.push(
          <Grid item xs={12} sm={6} md={3}>
            <MovieCard key={count} movie={baseMovies[count]} style={{ position: 'relative', left: '50%', transform: 'translate(-50%, 0)' }} />
          </Grid>
        );
      }
      count++;
    }
    return movies;
  }

  pageDown = () => {
    const res = this.state.page - 1;
    if (res > 0) {
      this.setState({ page: res });
    }
  }

  pageUp = () => {
    const res = this.state.page + 1;
    const pagesLimit = Math.ceil(this.props.base.movies.length / this.props.base.nbrView);
    if (res <= pagesLimit)
      this.setState({ page: res });
  }

  render() {
    const { classes } = this.props;
    return (

      <div className={classes.root}>
        <Grid container direction="row" justify="center" alignItems="flex-start" spacing={0}>
          <Grid xs={12} sm={12} md={7} className={classes.SelectComponent}>
            <Filter />
          </Grid>
          <Grid xs={6} sm={10} md={10}>
            <Grid container direction="row" justify="center" alignItems="flex-start" spacing={0}>
              {this.showMovies()}
            </Grid>
          </Grid>

          <Grid xs={12} sm={12} md={7}>
            <div style={{ textAlign: 'center', marginTop: '25px' }}>
              <Button className={classes.button} onClick={this.pageDown}>
                PREVIOUS
              </Button>
              <Button className={classes.button} onClick={this.pageUp}>
                NEXT
              </Button>
            </div>
          </Grid>

        </Grid>
      </div>
    )
  }
}


export default withStyles(classes)(Home);