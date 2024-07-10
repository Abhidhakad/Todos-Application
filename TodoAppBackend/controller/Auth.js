const User = require('../models/User.model');
const Todo = require('../models/Todo.model');
const OTP = require('../models/OTP.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const otpGenerator = require('otp-generator');
const mailSender = require('../utils/mailSender')

require('dotenv').config();


exports.sendOTP = async (req, res) => {
    try {
      // fecth email from request body
      const { email } = req.body;
      if(!email) return res.status(401).json({
          sucess:false,
          message:'Email is Required'
      })
      //check if user already exits:
      const checkUserPresent = await User.find({ email });
      console.log("CheckUserPresent: ",checkUserPresent);
  
      //id user already exits
      if (!checkUserPresent) {
        return res.status(401).json({
          success: false,
          message: "user already registered ",
        });
      }
  
      // generate otp
  
      let otp = otpGenerator.generate(6,{
          upperCaseAlphabets:false,
          lowerCaseAlphabets:false,
          specialChars:false,
      })
      console.log('otp generated: ',otp);
  
      // check unique otp or not 
  
    //   let result = await OTP.findOne({otp:otp});


    //   while(result){
    //       otp = otpGenerator(6,{
    //           upperCaseAlphabets:false,
    //           lowerCaseAlphabets:false,
    //           specialChars:false,
    //       });
    //       result = await OTP.findOne({otp:otp});
    //   } 
  
      const otpPayload = {email,otp};
  
      //create an entry for otp
  
      const otpBody = await OTP.create(otpPayload);

      if(!otpBody){
        return res.status(402).json({
            succes:false,
            message:'otp save in db failed'
        })
      }
  
    //   console.log("OTP response while db: ",otpBody);
      req.body.otp = otp;
      res.status(200).json({
          success:true,
          message:'OTP saved in db',
          otp
      })

    } catch (error) {
      console.log("Error occur in sendOtp controller: ",error);
      return res.status(500).json({
          success:false,
          message:"Error while SendOtp" 
      })
    }
}

exports.signUp = async(req,res) => {
    try {
        //fetch all detail from req body
        const { fullname,
            email,
            password,
            confirmpassword,
            otp} = req.body;

       

        
        if(!fullname || !email || !password || !confirmpassword || !otp){
            return res.status(422).json({
                success:false,
                message:"All fields are required: "
            })
        }

        // checck user is already exists: 
        const userExits = await User.findOne({email});
        if(userExits){
            return res.status(400).json({
                success:false,
                message:'User is already exits please login instread of signup'
            })
        }

        if(password !== confirmpassword){
            return res.status(402).json({
                success:false,
                message:'Passwrod and confirmPassword are not macthed'
            })
        }

        const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
        console.log("recentOtp: ",recentOtp);
        if(otp !== recentOtp[0].otp){
            return res.status(422).json({
                success:false,
                message:"Otp is not matching: "
            })
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const savedUser = await User.create({
            fullname,
            email,
            password:hashedPassword,
        })

    if(!savedUser){
        return res.status(500).json({
            success:false,
            message:'Error while Saved User in db'
        })
    }
    return res.status(201).json({
        success:true,
        message:'User saved in Db successfully'
    })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'Error in SignUp'
        })
    }
}



exports.login = async(req,res) => {
    try {
        //fetch the detail from req.body;
        const {email,password} = req.body;
        if([email,password].some((filed)=> filed.trim()==="")){
            return res.status(401).json({
                succes:false,
                message:'Email and password are required: '
            })
        }

        //check user exist in db 
        let existUser = await User.findOne({email});
        if(!existUser){
            return res.status(404).json({
                success:false,
                message:"User not found "
            })
        }

        //compare password
        const verifyPassword = await bcrypt.compare(password,existUser.password);

        if(!verifyPassword){
            return res.status(405).json({
                success:false,
                message:'Password is incorrect'
            })
        }

        const payload = {
            id:existUser._id,
            email:existUser.email,
        }
        const token = jwt.sign(payload,process.env.JWTSECRET_TOKEN,
            { expiresIn: '3h' })
        
        
        // console.log("typeof ",typeof(existUser));
        // existUser.toObject();
        existUser.token = token;
        existUser.password = undefined;
        
        // console.log(existUser.token);
        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };
        res.cookie("token", token, options).status(200).json({
            success: true,
            token,
            existUser,
            message: `User Login Success`,
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong in login Controller: "
        })
    }

}

exports.changePassword = async (req, res) => {
	try {
		// Get user data from req.user

		const userDetails = await User.findById(req.user.id);

		// Get old password, new password, and confirm new password from req.body
		const { oldPassword, newPassword, confirmNewPassword } = req.body;

		// Validate old password
		const isPasswordMatch = await bcrypt.compare(
			oldPassword,
			userDetails.password
		);
		if(oldPassword === newPassword){
			return res.status(400).json({
				success: false,
				message: "New Password cannot be same as Old Password",
			});
		}
		
		if (!isPasswordMatch) {
			// If old password does not match, return a 401 (Unauthorized) error
			return res
				.status(401)
				.json({ success: false, message: "Your Old Password is Wrong Please Enter Write Password" });
		}

		// Match new password and confirm new password
		if (newPassword !== confirmNewPassword) {
			// If new password and confirm new password do not match, return a 400 (Bad Request) error
			return res.status(400).json({
				success: false,
				message: "The password and confirm password does not match",
			});
		}

		// Update password
		const encryptedPassword = await bcrypt.hash(newPassword, 10);
		const updatedUserDetails = await User.findByIdAndUpdate(
			req.user.id,
			{ password: encryptedPassword },
			{ new: true }
		);

		// Send notification email
		// try {
		// 	const emailResponse = await mailSender(`${updatedUserDetails.email}`,
		// 		"Abhi Todos - Password Updated",
		// 		"Your Password is Updated:"
		// 	);
		// 	console.log("Email sent successfully:", emailResponse.response);
		// } catch (error) {

		// 	// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
		// 	console.error("Error occurred while sending email:", error);

		// 	return res.status(500).json({
		// 		success: false,
		// 		message: "Error occurred while sending email",
		// 		error: error.message,
		// 	});
		// }

		// Return success response
		return res
			.status(200)
			.json({ success: true, message: "Password updated successfully" });
	} catch (error) {
		// If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
		console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
	}
};

exports.updateName = async (req,res) => {
    try {
        const {name} = req.body;
        const id = req.user.id

        if(!name){
            return res.status(422).json({
                success:false,
                message:'Name is required'
            })
        }
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({
                success:false,
                message:'User not Found'
            })
        }

        const updated_user = await User.findByIdAndUpdate(id,{
            $set:{fullname:name}},{new:true})
        
        if(!updated_user){
            return res.status(402).json({
                success:false,
                message:"Update username db problem"
            })
        }

        res.status(201).json({
            success:true,
            updated_user,
            message:"Username Updated Successfully"
        })
    } catch (error) {
        console.log("errror occur in while updating name: ",error);
        console.error(error);
        res.status(500).json({
            success:false,
            message:'Error occur while updating the user name'
        })
    }

}

