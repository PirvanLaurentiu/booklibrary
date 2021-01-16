import React from 'react';
import Book from './Book';

class GenericBook extends React.Component {
    constructor() {
        super();
        this.state = {
            bookType: 'generic'
        };
    }
    render() {
        return (
            <Book {...this.props} bookType={this.state.bookType} title="Carti fizice" />
        );
    }
}

export default GenericBook;