const axios = require('axios');
const express = require('express');
const router = new express.Router();


const getUserData = async (name) => {
    const userData = (await axios.get(`https://jsonplaceholder.typicode.com/users/?name=${name}`)).data;
    return userData;
}

const getUserPosts = async (uid) => {
    const postData = (await axios.get(`https://jsonplaceholder.typicode.com/posts/?userId=${uid}`)).data;
    return postData;
}

const getUserComments = async (pid) => {
    const commentData = (await axios.get(`https://jsonplaceholder.typicode.com/comments/?postId=${pid}`)).data;
    return commentData;
}


router.get('/users/:name', async (req, res) => {
   
    const name = req.params.name;
    
    const userData = await getUserData(name);
    const uid = userData[0].id;
  
    const postData = await getUserPosts(uid);  
    let postArr = []
   
    for (let i = 0; i < postData.length; i++) {
        
        let commentsArr = []
        const pid = postData[i].id;
        const commentData = await getUserComments(pid);

        for (let j = 0; j < commentData.length; j++) {
            commentsArr.push({ name: commentData[j].name, body: commentData[j].body })
        }

        postArr.push({ title: postData[i].title, comments: commentsArr })

    }

    let userObj = { username:userData[0].username, name:userData[0].name, email:userData[0].email, city:userData[0].address.city, posts: postArr }
    console.log(userObj);
    return res.send(userObj);
})

module.exports = router