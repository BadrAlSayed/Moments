import {useState, useEffect} from 'react';
import Styles from './FormStyle';
import { TextField, Button, Typography, Paper} from '@material-ui/core';
import FileBase from 'react-file-base64';
import axios from 'axios';


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

const Form = ({ currentId, setCurrentId}) => {

    const [posts,setPosts] = useState([]);
    useEffect(() => {
        fetchPost().then((postData) => {
            setPosts(postData);
        })}, [currentId]);
  
    const post = currentId? posts.find((post) => post._id === currentId) : null;
    console.log(post)
    
    const [postData, setPostData] = useState({
        creater: '', title: '', message: '', tags: '', selectedFile: '',
    });
    useEffect(() => {
        if(post)
        setPostData(post);
    }, [post])
    
    const updatePost = async (currentId) => {
        await axios.patch(`http://localhost:5000/posts/${currentId}`,{
            creater: postData.creater,
            title: postData.title,
            message: postData.message,
            tags: postData.tags,
            selectedFile: postData.selectedFile,
        })
        

    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!currentId){
            await axios.post('http://localhost:5000/posts', {
                creater: postData.creater,
                title: postData.title,
                message: postData.message,
                tags: postData.tags,
                selectedFile: postData.selectedFile,
              }
            ) 
            .then(function (response) {
                console.log(response);
                clear();
                //window.location.reload(false);
              })
              .catch(function (error) {
                console.log(error);
              });
            }
        else {
            updatePost(currentId);
            clear();
            //window.location.reload(false);
            
        };
          
      
};
    const clear = () => {
        setCurrentId(null);
        setPostData({
            creater: '', title: '', message: '', tags: '', selectedFile: '',
        });
            
    };
    const styles= Styles();
    return (
        <Paper className={styles.paper}>
            <form   autoComplete="off" noValidate className={`${styles.root} ${styles.form}`} onSubmit={handleSubmit} >
                <Typography variant="h6" >{currentId? 'Editing' : 'Creating'} a memory</Typography>
                <TextField name="creater" variant="outlined" label="creater" fullWidth value={postData.creater} onChange={(e) => setPostData({...postData, creater: e.target.value})} />
                <TextField name="title" variant="outlined" label="title" fullWidth value={postData.title} onChange={(e) => setPostData({...postData, title: e.target.value})} />
                <TextField name="message" variant="outlined" label="message" fullWidth value={postData.message} onChange={(e) => setPostData({...postData, message: e.target.value})} />
                <TextField name="tags" variant="outlined" label="tags" fullWidth value={postData.tags} onChange={(e) => setPostData({...postData, tags: e.target.value})} />
                <div className={styles.fileInput} >
                < FileBase type="file" multiple={false} onDone={({base64}) => setPostData({...postData, selectedFile: base64})} />
                </div>
                <Button className={styles.buttonSubmit} varaint="contained" color="primary" size="large" type="submit" fullWidth >Submit</Button>
                <Button  varaint="contained" color="secondary" size="small" onClick={clear} fullWidth >clear</Button>

            </form>

        </Paper>
    )
}

export default Form
