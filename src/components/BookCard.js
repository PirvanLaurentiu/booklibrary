import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import clsx from 'clsx';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import {
    Grid,
    Card,
    CardContent,
    Typography,
    CardHeader
} from '@material-ui/core/'

const styles = theme => ({
    media: {
        height: "330px",
    },
});


class BookCard extends React.Component {
    constructor() {
        super();
        this.state = {
            expanded: false,
            count: null
        };
        this.handleBorrowButton = this.handleBorrowButton.bind(this);
    }

    setExpanded(expanded) {
        this.setState({expanded: expanded});
    }

    componentDidMount() {
        this.setState({count: this.props.elemData.count});
    }

    handleExpandClick = () => {
        this.setExpanded(!this.state.expanded);
    };

    handleBorrowButton = (bookId) => {
        if (this.state.count > 0 ) { 
            this.setState({count: this.state.count-1})
            fetch(`http://localhost:5000/api/borrowBook?bookId=${bookId}`, {
                method: 'POST',
            })
            .then(function(response) {
                return response.json()
            }).then(function(body) {
                console.log(body);
            });
        }
    }

    render() {
        const { classes } = this.props;
        return (
                <Card key={this.props.elemData.id}>
                    <CardActionArea>
                        <CardHeader
                            title={this.props.elemData.title}
                            subheader={this.props.elemData.author}
                            style={{minHeight: "15vh"}}
                        />
                            <CardMedia
                                className={classes.media}
                                component="img"
                                src={this.props.elemData.image_path } />
                        <CardContent>
                            <Typography variant="body2">
                                Stoc: {this.state.count}
                            </Typography>
                            <Typography variant="body2">
                                Gen: {this.props.elemData.genre}
                            </Typography>
                        </CardContent>

                        <CardActions disableSpacing>
                            <IconButton style={{fontSize: 18}} aria-label="add to favorites" onClick={ () => {this.handleBorrowButton(this.props.elemData.id)}}>
                            <FavoriteIcon />
                                {this.props.elemData.type === 'generic' ? "Imprumuta" : "Citeste"}
                            </IconButton>
                            <IconButton style={{fontSize: 18}}
                            className={clsx(classes.expand, {
                                [classes.expandOpen]: this.state.expanded,
                            })}
                            onClick={this.handleExpandClick}
                            aria-expanded={this.state.expanded}
                            aria-label="show more"
                            >
                            <ExpandMoreIcon />
                            Descriere
                            </IconButton>
                        </CardActions>
                        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                            <CardContent>
                            <Typography paragraph>Descriere:</Typography>
                            <Typography paragraph>
                                {this.props.elemData.description}
                                </Typography>
                            </CardContent>
                        </Collapse>
                    </CardActionArea>
                </Card>
        )
    }
}

export default withStyles(styles, { withTheme: true })(BookCard)