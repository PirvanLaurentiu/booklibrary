import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import clsx from 'clsx';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { red } from '@material-ui/core/colors';
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


class UserBookCard extends React.Component {
    constructor() {
        super();
        this.state = {
            expanded: false,
            count: null,
        };
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

    handleDownload = (bookID) => {
        console.log("downloading book");
    };

    handlePlay = (bookID) => {
        console.log("playing book")
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
            <Card key={this.props.elemData.id}>
                <CardActionArea>
                    <CardHeader
                        title={this.props.elemData.title}
                        subheader={this.props.elemData.author}
                        style={{ minHeight: "15vh" }}
                        avatar={
                            <Avatar aria-label="recipe" className={classes.avatar}>
                                { this.props.elemData.type === "generic" ? "F" : this.props.elemData.type === "electronic" ? "E" : "A" }
                            </Avatar>
                            }
                    />
                    <CardMedia
                        className={classes.media}
                        component="img"
                        src={this.props.elemData.image_path} />
                    <CardContent>
                        <Typography variant="body2">
                            Expira in: {this.state.count}
                        </Typography>
                        <Typography variant="body2">
                            Gen: {this.props.elemData.genre}
                        </Typography>
                    </CardContent>

                    <CardActions disableSpacing>
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
                        { this.props.elemData.type === "electronic" ? <IconButton size="small" style={{ fontSize: 15 }} aria-label="download" onClick={() => { this.handleDownload(this.props.elemData.id) }}>
                            <FavoriteIcon />
                            Descarca
                        </IconButton> : this.props.elemData.type === "audio" ?  <IconButton size="small" style={{ fontSize: 15 }} aria-label="play" onClick={() => { this.handlePlay(this.props.elemData.id) }}>
                            <FavoriteIcon />
                            Play
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

export default withStyles(styles, { withTheme: true })(UserBookCard)