import React from 'react';
import Book from './Book';

class EBook extends React.Component {
    constructor() {
        super();
        this.state = {
            bookType: 'electronic'
        };
    }
    render() {
        return (
            <Book {...this.props} bookType={this.state.bookType} title="Carti electronice" />
        );
    }
}

export default EBook;