import React from 'react';
import Book from './Book';

class AudioBook extends React.Component {
    constructor() {
        super();
        this.state = {
            bookType: 'audio'
        };
    }
    render() {
        return (
            <Book {...this.props} bookType={this.state.bookType} title="Carti audio" />
        );
    }
}

export default AudioBook;