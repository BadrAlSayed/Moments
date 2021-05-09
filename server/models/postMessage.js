import mongoose from 'mongoose';

const postScheme = mongoose.Schema({
    title: String,
    message: String,
    creater: String,
    tags: [String],
    selectedFile: String,
    likes:{
        type: [String],
        default: [],
    },
    createdAt:{
        type: Date,
        default: new Date()
    },
});

const postMessage = mongoose.model('postMessage', postScheme);

export default postMessage;