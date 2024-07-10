const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');

const OTPSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires: 60 * 5
    }
});


//OTPSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300000000 });


async function sendVerificationEmail(email, otp) {
	try {
		const mailResponse = await mailSender(
			email,
			"Verification Email",
			`This is Otp for Your Varfication Email ${otp}`
		);
		console.log("Email sent successfully: ", mailResponse);
	} catch (error) {
		console.log("Error occurred while sending email: ", error);
		throw error;
	}
}

// OTPSchema.pre("save",async function(next){
//     try {
//         // console.log(this.email);
//         // console.log(this.otp);
//         const mailResponse = await mailSender(this.email,"Verification Mail",`Otp is: ${this.otp}`)
//         // console.log("mail response: ",mailResponse);
//         next();
//     } catch (error) {
//         console.log("error in pre Hook while sending mail")
//         // process.exit(-1);
//     }
// })


OTPSchema.pre("save", async function (next) {
	// console.log("New document saved to database");

	// Only send an email when a new document is created
	try {
        if (this.isNew) {
            await sendVerificationEmail(this.email, this.otp);
        }
        next();
    } catch (error) {
        console.log(error)
    }
});

module.exports = mongoose.model("OTP",OTPSchema);