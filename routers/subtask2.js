const axios = require('axios');
const express = require('express');
const router = new express.Router();

const getUserComment = async (name,email) => {
    const commentData = (await axios.get(`https://jsonplaceholder.typicode.com/comments/?name=${name}&email=${email}`)).data;
    return commentData;
}

const getUserPost = async (postId) => {
    const postData = (await axios.get(`https://jsonplaceholder.typicode.com/posts/?id=${postId}`)).data;
    return postData;
}

const getUserData = async (userId) => {
    const userData = (await axios.get(`https://jsonplaceholder.typicode.com/users/?id=${userId}`)).data;
    return userData;
}

router.get('/user/:name/:email', async (req, res) => {

    const name = req.params.name;
    const email = req.params.email;
    console.log(name);
    console.log(email);

    const commentData = await getUserComment(name,email)
    const postId = commentData[0].postId
    const postData = await getUserPost(postId)
    const userId = postData[0].userId;
    const userData = await getUserData (userId)
    const actualName = userData[0].name 
    const actualUserName = userData[0].username 
    const actualEmail = userData[0].email 

    const userObj = { name: actualName, username: actualUserName, email: actualEmail }
    console.log(userObj);
    return res.send(userObj);

})

module.exports = router