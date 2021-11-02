  import React,{useContext} from 'react';
import {Link,useHistory} from 'react-router-dom'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { UserContext} from '../App'

function Navbar (){
  const {state,dispatch}= useContext(UserContext)
  const history=useHistory()
  const renderlist=()=>{
    if(state){
      return[
        <li><Link to="/profile">Gallery</Link></li>,
        <li><Link to="/CreatePost">CreatePost</Link></li>,
        <li>
            
          <button 
       onClick={()=>{
        localStorage.clear()
        dispatch({type:"CLEAR"})
        history.push('/signin') 
    }}
          >
              Sign out
          </button>
        </li>
      ]
    }else{
       return[
        <li><Link to="/Signin">Signin</Link></li>,
        <li><Link to="/Signup">Sign up</Link></li>
      ]
    }
  }
    return(
        <nav>
    <div className="nav-wrapper">
      <Link to={state?"/":"/signin"} className="brand-logo left">Your pic bank</Link>
      <ul id="nav-mobile" className="right ">
       
      {renderlist()}

      </ul>
    </div>
  </nav>
    )
}export default Navbar