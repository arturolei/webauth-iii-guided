const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../users/users-model.js');
const secrets = require('../config/secrets.js');


module.exports = (req, res, next) => {
  //Let's try this with Tokens
  const token = req.headers.authorization;
  if (token){
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) =>{
      if (err){
        //bad token 
        res.status(401).json({message:"something wrong with auth", err});
      } else {
        req.decodedJwt = decodedToken;
        next();
      }
    })
  } else {
    res.status(401).json({message: 'You got no token'})
  }
  
  
  
  /*
  //With Headers
  const { username, password } = req.headers;

  if (username && password) {
    Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          next();
        } else {
          res.status(401).json({ message: 'Invalid Credentials' });
        }
      })
      .catch(error => {
        res.status(500).json({ message: 'Ran into an unexpected error' });
      });
  } else {
    res.status(400).json({ message: 'No credentials provided' });
  }

  */
};
