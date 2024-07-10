const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.auth = async (req, res, next) => {
  try{
      //extract token
      const token = req.cookies.token 
                      || req.body.token 
                      || req.header("Authorisation").replace("Bearer ", "");

      //if token missing, then return response
      if(!token) {
          return res.status(401).json({
              success:false,
              message:'Please login Again',
          });
      }

      //verify the token
      try{
          const decode =  jwt.verify(token, process.env.JWTSECRET_TOKEN);
          console.log("decode= ",decode);
          req.user = decode;
      }
      catch(err) {
          //verification - issue
          return res.status(401).json({
              success:false,
              token:token,
              message:'Please Login',
          });
      }
      next();
  }

  catch(error) {  
      return res.status(401).json({
          success:false,
          message:'Something went wrong while validating the token',
      });
  }
}
