import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import clsx from 'clsx';
import { red } from '@material-ui/core/colors';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Avatar from '@material-ui/core/Avatar';



import {
    Card,
    CardContent,
    Typography,
    CardHeader
} from '@material-ui/core/'

const styles = theme => ({
    media: {
        height: "330px",
    },
    avatar: {
        backgroundColor: red[500],
      },
});


class BookCard extends React.Component {
    constructor() {
        super();
        this.state = {
            expanded: false,
            count: null,
        };
        this.handleBorrowButton = this.handleBorrowButton.bind(this);
    }

    setExpanded(expanded) {
        this.setState({ expanded: expanded });
    }

    componentDidMount() {
        this.setState({ count: this.props.elemData.count });
    }

    handleExpandClick = () => {
        this.setExpanded(!this.state.expanded);
    };

    handleBorrowButton = (bookId) => {
        const username = localStorage.getItem("username")
        console.log(username)
        if (!username) {
            this.props.setError("You must be logged in")
            this.props.setErrorOpen(true)
            return
        }
        if (this.state.count > 0) {
            fetch(`/api/borrowBook?bookId=${bookId}&username=${username}`, {
                method: 'POST',
            })
                .then((response) => {
                    console.log(response)
                    if (response.ok) {
                        this.setState({ count: this.state.count - 1 })
                    } else if (response.status === 304) {
                        this.props.setError("Ai deja aceasta carte")
                        this.props.setErrorOpen(true)
                    } else {
                        this.props.setError(response.statusText)
                        this.props.setErrorOpen(true)
                    }
                })
        } else {
            this.props.setError("No more books in stock")
            this.props.setErrorOpen(true)
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
            <Card key={this.props.elemData.id}>
                <CardActionArea>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe" className={classes.avatar}>
                                { this.props.elemData.type === "generic" ? "F" : this.props.elemData.type === "electronic" ? "E" : "A" }
                            </Avatar>
                            }
                        title={this.props.elemData.title}
                        subheader={this.props.elemData.author}
                        style={{ minHeight: "15vh" }}
                    />
                    <CardMedia
                        className={classes.media}
                        component="img"
                        src={this.props.elemData.image_path} />
                    <CardContent>
                        <Typography variant="body2">
                            Stoc: {this.state.count}
                        </Typography>
                        <Typography variant="body2">
                            Gen: {this.props.elemData.genre}
                        </Typography>
                    </CardContent>

                    <CardActions disableSpacing>
                        <IconButton size="small" style={{ fontSize: 15 }} aria-label="imprutuma" onClick={() => { this.handleBorrowButton(this.props.elemData.id) }}>
                            <FavoriteIcon />
                            Imprumuta
                        </IconButton>
                        <IconButton size="small" style={{ fontSize: 15 }}
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
                        { this.props.elemData.type === "electronic" ? <IconButton size="small" style={{ fontSize: 15 }} aria-label="download" onClick={() => { this.handleBorrowButton(this.props.elemData.id) }}>
                            <FavoriteIcon />
                            Descarca
                        </IconButton> : null }
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
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(BookCard)