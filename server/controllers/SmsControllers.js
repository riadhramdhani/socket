require ('dotenv').config()
const authToken= process.env.authToken
const accountSid=process.env.accountSid
const client = require('twilio')(accountSid, authToken)
module.exports={
    sendSms: (req,res)=>{
        client.messages
        .create({
            body:req.body.msg,
            from:'',
            to:''
        })
        .then (message=>console.log(message))

    }
}
