import React,{useState} from 'react'
import { Link,useHistory } from 'react-router-dom'
import M from 'materialize-css'
export const Signin = () => {
    const history=useHistory();
   const [name,setName]=useState("");
   const [password,setPassword]=useState("");
   const[email,setEmail]=useState("")
   const PostData=()=>{
       if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email) )
       {
        M.toast({html:"mail id invalid!",classes:"#c62828 red darken-3 "})
        return
       }
       fetch("/signup",{
           method:"post",
           headers:{
               "Content-Type":"application/json"
           },
           body:JSON.stringify({
               name,
               password,
               email
           })
       }).then(res=>res.json())
       .then(data=>{
           if(data.error){
            M.toast({html:data.error,classes:"#212121 grey darken-4"})

           }
           else{
               M.toast({html:data.message,classes:"#69f0ae green accent-2"})
               history.push('/Signin')
           }
       }).catch(err=>{
           console.log(err)
       })
       }
   
    return (
        <div className="mycard">
        <div className="card auth-card input-field">
          <h2>Instagram</h2>
          <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          />
          <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
       
          />
          <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          />
          <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
      onClick={()=>{
          PostData()
      }}
          >
              signup
          </button>
        
  <h5>
      <Link to="/Signin">Already have account</Link>
  </h5>
      </div>
    </div>
    )
    }
export default Signin