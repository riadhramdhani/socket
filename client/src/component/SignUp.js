import React ,{useState} from 'react'
import axios from "axios"

function SignUp() {
    const [email, setEmail]= useState('')
    const[password, setPassword]= useState('')
    const register= ()=>{
        axios.post("http://localhost:5000/api/signup", {
            email: email,
            password: password
        }).then((res)=>{
            console.log(res)
        })
    }
  return (
    <>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button  onClick={()=>register()}>SignUP</button>
      </>
  )
}

export default SignUp