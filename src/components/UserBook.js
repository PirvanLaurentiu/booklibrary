import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import UserBookCard from './UserBookCard';
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import ErrorIcon from "@material-ui/icons/Error";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from '@material-ui/core/IconButton';
import Pagination from '@material-ui/lab/Pagination';
import isEqual from 'lodash/isEqual';


import {
    Grid,
} from '@material-ui/core/'


const drawerWidth = 240 + 15;


const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2),
        marginLeft: 'auto'
    },
    icon: {
        color: 'blue',
    },
    table: {
        flex: '1 1 auto',
        height: '82vh',
    },
    container: {
        display: 'flex'
    },
    displayNone: {
        display: 'none',
    },
});

class UserBook extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
            page: 1,
            books: [],
            paginationCount: 0,
            error: null,
            errorOpen: false,
            booksPerPage: 8,
        };
        this.setError = this.setError.bind(this);
        this.setErrorOpen = this.setErrorOpen.bind(this);
        this.setErrorClose = this.setErrorClose.bind(this);
    }

    fetchJobs() {
        const username = localStorage.getItem("username")
        if (!username) {
            window.location.href = '/home';
        }
        fetch(`/api/userBorrowed?page=${this.state.page - 1}&username=${username}&rowsPerPage=${this.state.booksPerPage}`)
            .then(res => {
                if (res.status >= 400 && res.status < 600) {
                    throw new Error("Bad response from server");
                  }
                  return res;
            })
            .then(res => res.json())
                .then(books_ => this.setState({ 
                    books: books_["data"],
                    paginationCount: Math.ceil(books_["paginationCount"] / this.state.booksPerPage),
                    isLoading: false  
                }, () => console.log("successfully fetched jobs", books_, this.state)
                )).catch(e => {
                    console.log(e);
                });
    }

    setError(error) {
        this.setState({ error: error });
        console.log(this.state.error);
    }

    setErrorOpen() {
        this.setState({ errorOpen: true });
    }

    setErrorClose() {
        this.setState({ errorOpen: false });
        console.log(this.state)
        this.setState({ error: "" })

    }

    componentDidMount() {
        this.fetchJobs(this.state.page);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!isEqual(nextState, this.state)) {
            return true
        }

        return false
    }

    componentDidUpdate(prevProps, prevState) {
        if (!isEqual(prevState.page, this.state.page)) {
            this.fetchJobs();
        }
    }

    setExpanded(expanded) {
        this.setState({expanded: expanded})
        console.log(this.state.expanded)
    }

    handleExpandClick = () => {
        this.setExpanded(!this.state.expanded);
    };

    handleChange = (e, p) => {
        this.setState({page: p})
    }

    render() {
        const { classes } = this.props;
        return (
        <div className="App">
            <div className={classes.root}>
                <Grid
                    container
                    spacing={2}
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                    style={{ minHeight: '100vh', maxWidth: "150vh", marginLeft: drawerWidth, marginTop: "8vh" }}
                >
                    {this.state.books.map(elem => (
                        <Grid item xs={12} sm={6} md={3} key={this.state.books.indexOf(elem)}>
                            <UserBookCard elemData={elem} setError={this.setError} setErrorOpen={this.setErrorOpen} />
                        </Grid>
                    ))}
                </Grid>
                </div>
                {this.state.error ? (
            <Snackbar
              variant="error"
              key={this.state.error}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center"
              }}
              open={this.setErrorOpen}
              onClose={this.setErrorClose}
              autoHideDuration={3000}
            >
              <SnackbarContent
                className={classes.error}
                message={
                  <div>
                    <span style={{ marginRight: "8px" }}>
                      <ErrorIcon fontSize="large" color="error" />
                    </span>
                    <span> {this.state.error} </span>
                  </div>
                }
                action={[
                  <IconButton
                    key="close"
                    aria-label="close"
                    onClick={this.setErrorClose}
                  >
                    <CloseIcon color="error" />
                  </IconButton>
                ]}
              />
            </Snackbar>
                ) : null }
            <Pagination style={{ "marginLeft": "70%"}}
                count={this.state.paginationCount}
                page={this.state.page}
                onChange={this.handleChange}
                size="large"
            />
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(UserBook)