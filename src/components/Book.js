import React from 'react';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
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
    statusSuccessful: {
        color: 'green',
        fontWeight: 'bold',
    },
    statusFailed: {
        color: 'red',
        fontWeight: 'bold',
    },
    statusInProgress: {
        color: 'blue',
        fontWeight: 'bold',
    },
    displayNone: {
        display: 'none',
    }
});


class Book extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
        };
    }

    fetchJobs(newPage, rowsPerPage) {
        console.log(this.props);
    }

    componentDidMount() {
        this.fetchJobs(this.state.page, this.state.rowsPerPage);
    }

    render() {
        const { classes } = this.props;
        return (
            <div className="App">
                <p>Home page</p>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(Book)