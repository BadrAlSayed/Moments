import Styles from './Stylepop';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
import axios from 'axios';






const Post = ({post, setCurrentId}) => {

    const deletePost = async (post) => {
        await axios.delete(`http://localhost:5000/posts/${post._id}`,{_id: post._id})
    }
    const likePost = async (post) => {
        await axios.patch(`http://localhost:5000/posts/${post._id}/likePost`)
    }
    // useEffect(() => {
    //     if(post)
    //     setCurrentId(post);
    // }, [post])

    const editPost = (id) =>{
        setCurrentId(id);
        console.log(id)
    };


    const styles = Styles();
    return (
        <Card className={styles.card} >
            <CardMedia className={styles.media} image={post.selectedFile} title={post.title} />
            <div className={styles.overlay} >
                <Typography variant="h6" > {post.creater} </Typography  >
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>  
            <div className={styles.overlay2} >
                <Button style={{color: 'white'}} size="small" onClick={() => {editPost(post._id)}} ><MoreHorizIcon fontsize="deafult" /></Button>
            </div>

            <div className={styles.details} >
                <Typography variant="body2" color="textSecondary" >{post.tags.map((tag) => `#${tag} `)} </Typography>
            </div> 
            <Typography className={styles.title} variant="h5" gutterBottom >{post.title}</Typography>   
            <CardContent>
                    <Typography variant="h5" gutterBottom >{post.message}</Typography>
            </CardContent>
             <CardActions className={styles.cardActions} >
                 <Button size="small" color="primary" onClick={() => {likePost(post)}} > <ThumbUpAltIcon fontSize="small" /> Like {post.likeCount}</Button>
                 <Button size="small" color="primary" onClick={() => {deletePost(post)}} > <DeleteIcon fontSize="small" /> Delete</Button>
             </CardActions>
        </Card>
    );
};

export default Post
