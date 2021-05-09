import { Grid, CircularProgress} from '@material-ui/core';
import Post from './Post';
import Styles from './PostsStyle';
import axios from 'axios';
import { useState, useEffect} from 'react';

const fetchPost = () => {
    return axios.get('http://localhost:5000/posts')
    .then(res => {
        //console.log(res.data)
        return res.data;
    })
    .catch(err => {
        console.log(err);
    })
     
};

const Posts =  ({setCurrentId}) => {

const [posts,setPosts] = useState([]);

useEffect(() => {
    fetchPost().then((postData) => {
        setPosts(postData);
    })}, [posts]);
    
    const styles= Styles();
    return (
        
           !posts.length? <CircularProgress />:(
               <Grid className={styles.mainContainer} container alignItems="stretch" spacing={4} >
                   {
                       posts.map((post) => (
                           <Grid key={post._id} item xs={12} sm={6} >
                               <Post post={post}  setCurrentId={setCurrentId} />
                            </Grid>
                             ))};
                </Grid>
           ))};

export default Posts
