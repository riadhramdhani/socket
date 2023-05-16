const nodemail = require("nodemailer")
require("dotenv").config()
const transporter=nodemail.createTransport({
    port:587,
    host:"smtp.gmail.com",
    secure:false,
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASSWARD
    },
    tls:{
        rejectUnauthorized:false
    }
    
}
)
transporter.verify((err,succ)=>{
    if (err){
        console.log(err)
    }else
    {
        console.log("mail is ready to send")
    }

})
const nodemaile=async(req,res,next)=>{
    var email=req.body.email;
    var subject=req.body.subject;
    var msg=req.body.msg;
    var html=`
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
  <h1>${subject}</h1>  
  <h2>${email}</h2>
  <p>${msg}</p>
</body>
</html>
    `
    var mail={
        from:email,
        to:process.env.EMAIL,
        subject:subject,
        text:msg,
        html:html
    }
    transporter.sendMail(mail,(error,data)=>{
        if (error){
            res.json({
                status:"fail"

            })

        }
        else{
            res.json({
                status:"succes"
            })
        }
    })

}
module.exports={nodemaile}