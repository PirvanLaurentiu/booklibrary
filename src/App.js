import React from 'react';
import './App.css';
import SideMenu, { Sidebar } from './components/SideMenu';
import Book from './components/Book';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from "./components/Home";
import AudioBook from "./components/AudioBook";
import EBook from "./components/EBook";
import GenericBook from "./components/GenericBook";
import Login from "./components/Login";

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
            		<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/carti-fizice" render={(props) => <GenericBook {...props} />} />
						<Route path="/carti-electronice" render={(props) => <EBook {...props} />} />
						<Route path="/carti-audio" render={(props) => <AudioBook {...props} />} />
						<Route exact path="/login" component={Login} />
					</Switch>
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