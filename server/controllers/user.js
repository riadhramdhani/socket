const bcrypt=require("bcrypt")
const jwt= require("jsonwebtoken")
const {connection}= require("../config/connection")
module.exports= {
    createuser:async(req,res)=>{
        const {email,password}=req.body
        try {
              connection.query(`select * from users where email="${email}"`,(error,  result)=>{
                if(result.length>0){
                    res.status(202).json({msg:"user ready exist"})
    
                }else
           {
        
                const salt=  bcrypt.genSalt(10) 
                const hachpassword=  bcrypt.hash(password,salt)
                const newuser=  connection.query(`insert into users(email,password)values("${email}","${hachpassword}")`)
                const token= jwt.sign({email},"scretkey")
                res.json({token})}
            })
          
        } catch (error) {
            res.status(500).json({msg:"error server"})

            
        }

    },
    sginIn:async(req,res)=>{
        const {email,password}=req.body
        try {
          const user =  await connection.query(`select * users where email= ${email}`)
          if(user.length===0){
            res.status(401).json({msg: "user doesn't exist"})

          }
          const matchuser= await bcrypt.compare(password, user.row[0].password)
          if (! matchuser){
            res.status(401).json({msg: 'invalid email'})
          }
          res.json({token})


        } catch (error) {
           res.status(500).json({msg:'server error'})
        }

    }
}