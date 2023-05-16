import Form from 'react-bootstrap/Form';
import { useState, useEffect, useRef } from 'react';
import axios from "axios"
import {io} from 'socket.io-client';



function TextControlsExample() {
  const [socket, setSocket] = useState(null);
  const [messages,setMessages]=useState([])
  const [text,setText]=useState("")
  const getMessages = async () => {
    try {
      const response = await axios.get('http://localhost:5000/getmessage');
      setMessages(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    const socket= io("http://localhost:5000")
    socket.on('connection', () => {
      console.log(`I'm connected with the back-end`);
   
});
setSocket(socket)
getMessages();
const intervalId = setInterval(getMessages, 1000);
return () => clearInterval(intervalId);
  },[])
const SendMessage=(event)=>{
  event.preventDefault()
  setText("")
  const data={
     senderId:1,
     ReciperId:2,
     Message: text
    }
    console.log (data)
    axios.post("http://localhost:5000/sendmessage",{
      senderId:1,
      ReciperId:2,
      Message: text,
      // send_at: Date.now()

    }).then((res)=>{
      console.log(res.data)
    })
    
socket.emit("new_message", data)

}
  // const sendmail=()=>{
  //   axios.post("http://localhost:5000/api/sendmail",{
  //     email:email,
  //     subject:subject,
  //     msg:text

  //   }).then((res)=>{console.log(res.data)})

  // }
  // const sendSMS=()=>{
  //   axios.post("http://localhost:5000/api/sendSms",{
  //     msg: email
  //   }).then((res)=>console.log(res.data))
  // }
  return (
    <>
    <div>
        {messages.map((msg) => (
          <div key={msg.id}>
            <strong>{msg.sender}</strong>: {msg.message_text}
          </div>
        ))}
        </div>
    <Form>
     <input value={text} onChange={(event)=>setText(event.target.value)}  /> 
     <button  onClick={SendMessage}> Send Message  </button> {console.log(messages)}

    </Form>
    </>
  );
}

export default TextControlsExample;