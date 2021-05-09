import express from 'express';
import postMessage from '../models/postMessage.js'
import mongoose from 'mongoose'
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req,res) => {
    try {
        
                const posts = await postMessage.find();
                res.status(200).json(posts);
            } catch (error) {
                res.status(404).json({message: error.message});
            }
});

router.post('/', async (auth,req,res) => {
    const newPost = new postMessage(req.body);
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({message: ErrorEvent.message});
        
    }
});

router.patch('/:id', async (auth,req,res) => {
    const { id } = req.params;
    const { title, message, creater, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) 
        return res.status(404).send(`No post with id: ${id}`);
    const updatedPost = { creater, title, message, tags, selectedFile, _id: id };
    await postMessage.findByIdAndUpdate(id, updatedPost, { new: true });
    res.json(updatedPost);
});

router.delete('/:id', async (auth,req,res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) 
        return res.status(404).send(`No post with id: ${id}`);
    await postMessage.findByIdAndRemove(id);
    res.json("deleted");    

});

router.patch('/:id/likePost', async (auth,req,res) => {
    const {id} = req.params;
    if(req.userId){
        return res.json({message: "unauthrized access"})
    }
    if (!mongoose.Types.ObjectId.isValid(id)) 
        return res.status(404).send(`No post with id: ${id}`);
    const post = await postMessage.findById(id);
    const checkId = post.likes.findIndex((id) => id === String(req.userId));
   
    if(checkId)
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    else{
        post.likes.push(req.userId);
    }
    
    const updatedPost = await postMessage.findByIdAndUpdate(id, post, { new: true });
    res.json(updatedPost);
});



export default router;
