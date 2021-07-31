import React from 'react';
import './App.css';
import SideMenu, { Sidebar } from './components/SideMenu';
import Book from './components/Book';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from "./components/Home";
import AudioBook from "./components/AudioBook";
import EBook from "./components/EBook";
import GenericBook from "./components/GenericBook";
import UserBook from "./components/UserBook";
import Login from "./components/Login";
import Register from "./components/Register";
import Header from "./components/Header";
import history from './history';
import Axios from "axios";


class App extends React.Component {
    constructor() {
        super();
    }
    
    render() {
        return (
            <BrowserRouter history={history}>
            		<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/carti-fizice" render={(props) => <GenericBook {...props} />} />
						<Route path="/carti-electronice" render={(props) => <EBook {...props} />} />
						<Route path="/carti-audio" render={(props) => <AudioBook {...props} />} />
                        <Route path="/cartile-mele" render={(props) => <UserBook {...props} />} />
						<Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
					</Switch>
                <div className="App">
                    <Header />
                    <SideMenu />
                </div>
            </BrowserRouter>
        )
    }
}

export default App;