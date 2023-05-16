const express=require ("express")
const{mailrouter}=require("./routers/mailrouter")
const {smsRouter}=require ('./routers/SmsRouter')
const {authRouter}= require('./routers/userRouter')
const app = express()
const{connection}=require("./config/connection")

const port=5000
const cors=require ("cors")
const socket = require('socket.io');



app.use(cors())
app.use(express.json())
app.use("/",mailrouter)
app.use ("/", smsRouter)
app.use('/', authRouter)

const server=app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})
const io = socket(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });
  io.on("connection", (socket)=>{
    console.log('user connected')
    socket.emit('connection', null);
   socket.on("new_message", (data)=>{
    const {senderId, ReciperId, Message,sent_at}=data
  
    const quiery=`insert into messages(sender_id, recipient_id, message_text) values("${senderId}","${ReciperId}","${Message}")`
    connection.query(quiery,(Error,Result)=>{
        if(Error){
            console.log(Error)
        }
        else {
            console.log(Result)
            io.emit("new_message",data)

        }
        

    }) 
    socket.on("deconnection",()=> console.log("socket deconnected"))  
})

  }
  )
  app.post("/sendmessage",(req,res)=>{
    const {senderId, ReciperId, Message}=req.body
    io.emit("new_message", {senderId, ReciperId, Message} )
    res.json({success: true})
   
  })
  app.get("/getmessage",(req,res)=>{
    const {senderId, ReciperId}=req.body
    const query = 'SELECT * FROM messages'
    const values=[senderId, ReciperId,ReciperId, senderId]
    connection.query(query,(Error,Result)=>{
        if(Error){
            console.log(Error)
        } else{
            res.json(Result)
        }
    })
    
   
  })
   
