const User = require('../models/User.model');
const crypto = require('crypto');
const mailSender = require('../utils/mailSender')
const bcrypt = require('bcrypt');



exports.resetPasswordToken = async(req,res) => {
    try {
        const {email} = req.body;
        if(!email){
            return res.status(402).json({
                success:false,
                message:"email is empty"
            })
        }
        const user = await User.findOne({email});
        if(!user){
            return res.json({
                success:false,
                message:"User is not Registered please sign up"
            })
        }
        
        const token = crypto.randomBytes(20).toString('hex');

        const updateDetail = await User.findOneAndUpdate({email},{
            token:token,
            resetPasswordExpires: Date.now() + 3600000
        },{new:true});
        console.log(updateDetail);
        const url = `http://localhost:3000/update-password/${token}`;

       const mailResponse =  await mailSender(email,
            "Password Reset Link",
            `Please use this Link to Reset Your Paswword /n Reset Password: ${url} `)
        if(!mailResponse){
            return res.json({
                success:false,
                message:"Email send Error try after sometimes"
            })
        }
        res.json({
                success: true,
                message:
                    "Email Sent Successfully, Please Check Your Email to Continue Further",
            });
       } catch (error) {
        return res.json({
			error: error.message,
			success: false,
			message: `Some Error in Sending the Reset Message`,
		});
       }
}


exports.resetPassword = async (req, res) => {
	try {
		const { password, confirmPassword, token } = req.body;

		if (confirmPassword !== password) {
			return res.json({
				success: false,
				message: "Password and Confirm Password Does not Match",
			});
		}
		const userDetails = await User.findOne({ token: token });
		if (!userDetails) {
			return res.json({
				success: false,
				message: "Login again",
			});
		}
		if (!(userDetails.resetPasswordExpires > Date.now())) {
			return res.status(403).json({
				success: false,
				message: `Token is Expired, Please Regenerate Your Token`,
			});
		}
		const encryptedPassword = await bcrypt.hash(password, 10);
		await User.findOneAndUpdate(
			{ token: token },
			{ password: encryptedPassword },
			{ new: true }
		);
		res.json({
			success: true,
			message: `Password Reset Successful`,
		});
	} catch (error) {
		return res.json({
			error: error.message,
			success: false,
			message: `Some Error in Updating the Password`,
		});
	}
};