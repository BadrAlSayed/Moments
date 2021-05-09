import axios from 'axios';

const url = 'http://localhost:5000/posts';

export const fetchPosts = () => axios.get(url).then(function (response) {
    // handle success
    const res = response.data
    return res;

  }).then(function(result) {
    return result })
  .catch(function (error) {
    // handle error
    console.log(error);
  }); 