import React, {useState, useEffect} from "react";
import AddNewPost from '../../containers/AddNewPost'
import { Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import CardActionArea from '@material-ui/core/CardActionArea';
import { List } from "react-virtualized";
import { withStyles } from '@material-ui/core/styles';
import * as ReactBootstrap from 'react-bootstrap'

const styles  = {
    card: {
        width: '75%',
        display: 'flex',
        height: '250px',
        margin: 'auto',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        minWidth: 270,
    },

    media: {
        minWidth: 270,
    },

   
};

const height = 850;
const rowHeight = 270;
const width = 1050;

function Posts(props){
    const [show, setShow] = useState(false);
    const [des, setdes] = useState('')
    const[titlecard, settitlecard] = useState('')
    const[img, setimg] = useState('')

    const handleClose = () => {
        setShow(false);
        setdes('')
        settitlecard('')
        setimg('')
    }

    const handleShow = (index, posts) => {
        setShow(true);
        setdes(posts[index].description)
        settitlecard(posts[index].data.media[0].description)
        setimg(posts[index].data.media[0].image)
    }

    var Modal = ReactBootstrap.Modal;

    const rowRenderer = ({ index, key, style }) => {
        let { posts,classes } = props
        return (
          <div key={key} style={style}>
                
            <Card className={classes.card} onDoubleClick = {()=>handleShow(index, posts)}>
                <Modal show={show} onHide={handleClose} style={{'marginTop':'10%'}}>
                        <Modal.Header closeButton>
                        </Modal.Header>
                        
                        <Card style={{textAlign : 'center'}}>
                            <CardActionArea>
                                <img src={img} style={{minWidth: '270', height: '250px',margin: 'auto', position: 'contain'}}/>
                                <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                {titlecard}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                {des}
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                            
                        </Card>
                </Modal>


                <CardMedia
                    className={classes.cover}
                    image={posts[index].data.media[0].image}
                    title={posts[index].data.media[0].description}
                />
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <Typography component="h5" variant="h5">
                            {posts[index].data.media[0].description}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            {posts[index].description}...
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="primary" onClick={() => props.getPost(posts[index].id)}>
                            Edit Post
                        </Button>
                        <Button size="small" color="primary" onClick={() => props.deletePost(posts[index].id)}>
                            Delete Post
                        </Button>
                    </CardActions>
                </div>
                
            </Card>
          </div>
        );
    };

    const { open,closePopup,currentTite,currentDesc,imagePreviewUrl,update,postId,updatePost,addNewPost, } = props
    
    
    
    return (
        <div style={{ padding: "80px 0 0 0" }}>
            <List
                rowCount={props.posts.length}
                width={width}
                height={height}
                rowHeight={rowHeight}
                rowRenderer={rowRenderer}
                overscanRowCount={3}
                style={{width:"100%"}}
            />
            <AddNewPost
                open={open}
                closePopup={closePopup}
                addNewPost = {addNewPost}
                currentTite = {currentTite}
                currentDesc = {currentDesc}
                imagePreviewUrl = {imagePreviewUrl}
                update = {update}
                postId = {postId}
                updatePost = {updatePost}
                />
        </div>
        );

}

export default withStyles(styles)(Posts);
