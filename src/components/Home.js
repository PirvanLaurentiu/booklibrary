import React from 'react';

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoading: true
        };
    }
    
    render() {
        const { classes } = this.props;
        return (
                <div className="Home">
                    <p>Urmeaza</p>
                </div>
        )
    }
}

const headerStyle = {
    background: '#03a9f4',
    color: '#fff',
    textAlign: 'center',
    padding: '10px'
}
export default Home;