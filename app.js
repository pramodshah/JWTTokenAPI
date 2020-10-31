const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.get('/',(req,res)=>{
    res.json({
        message:"Welcome to home page"
    });
});

app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to the JWT Authentication API'
  });
});

app.get('/api/posts', verifyToken, (req, res) => {  
  jwt.verify(req.token, 'mysecretkey', (err, userData) => {
    if(err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'Post created...',
        userData
      });
    }
  });
});

app.post('/api/login', (req, res) => {
  //  user
  const user = {
    id: 1, 
    username: 'pramodshah',
    email: 'pramodshah1444@gmail.com',
    Phone:'8802556791'
  }

  jwt.sign({user:user}, 'mysecretkey', (err, token) => {
    res.json({token:token});
  });
});

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if(typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }

}
const PORT = 3000;
app.listen(PORT,()=>{
    console.log("Server running on port : " + PORT);
})