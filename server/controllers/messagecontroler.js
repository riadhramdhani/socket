
const connection = require("../config/connection")
module.exports= {
    addmessages:(req,res,next)=>{
        const quiery=`insert into messages(sender_id, recipient_id, message_text) values("${req.body.senderId}","${req.body.ReciperId}","${req.body.Message}")`
connection.query(query,(Error,Result)=>{
    
    if(Error){
        console.log(Error)
    } else{
        res.status(200).send(Result)
    }

})
    }

}

