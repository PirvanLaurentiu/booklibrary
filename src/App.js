import React from 'react';
import './App.css';
import SideMenu, { Sidebar } from './components/SideMenu';
import Book from './components/Book';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoading: true
        };
    }
    
    fetchBooks(newPage, rowsPerPage) {
        console.log(this.props)
    }

    componentDidMount() {
        this.fetchBooks(this.state.page, this.state.rowsPerPage)
    }

    render() {
        const { classes } = this.props;
        return (
            <BrowserRouter>
                <div className="App">
                    <SideMenu />
                </div>
            </BrowserRouter>
        )
    }
}

const headerStyle = {
    background: '#03a9f4',
    color: '#fff',
    textAlign: 'center',
    padding: '10px'
}
export default App;