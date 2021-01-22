import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import BookCard from './BookCard';

import {
    Grid,
} from '@material-ui/core/'

const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2)
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


class Book extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
            page: 0,
            books: [],
            paginationCount: 0,
        };
    }

    fetchJobs(newPage) {
        //console.log(this.props)
        fetch(`/api/books?page=${newPage}&bookType=${this.props.bookType}`)
            .then(res => res.json())
                .then(books_ => this.setState({ 
                    books: books_["data"],
                    paginationCount: books_["paginationCount"],
                    page: newPage,
                    isLoading: false 
                }, () => console.log("successfully fetched jobs", books_, this.state)
                ))
    }

    componentDidMount() {
        this.fetchJobs(this.state.page);
    }

    setExpanded(expanded) {
        this.setState({expanded: expanded})
        console.log(this.state.expanded)
    }

    handleExpandClick = () => {
        this.setExpanded(!this.state.expanded);
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid
                    container
                    spacing={2}
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                    style={{ minHeight: '100vh', maxWidth: "150vh" }}
                >
                    {this.state.books.map(elem => (
                        <Grid item xs={12} sm={6} md={3} key={this.state.books.indexOf(elem)}>
                            <BookCard elemData={elem} />
                        </Grid>
                    ))}
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(Book)