  import React,{useEffect,createContext,useReducer,useContext} from 'react';
import Navbar from './components/Navbar';
import {BrowserRouter,Route,Switch,useHistory}from 'react-router-dom';
import Home from './components/screens/Home';
import Profile from './components/screens/Profile';
import Signup from './components/screens/Signup';
import Signin from './components/screens/Signin';
import CreatePost from './components/screens/CreatePost';
import{reducer,initialState}from './reducers/userReducer'
import "./App.css";

export const UserContext = createContext()

const Routing=()=>{
  const history=useHistory()
  const {state,dispatch}= useContext(UserContext)
  useEffect(()=>{
    const user= JSON.parse(localStorage.getItem("user"))
    console.log(user)
    if(user){
      dispatch({type:"USER",payload:user})
      
    }else{
      history.push('/signin')
    }
  },[])

  return(
    <Switch>
          <Route exact path="/">
          <Home/>   
          </Route>
          <Route path="/Signin"><Signin/></Route>
          <Route path="/Profile"><Profile/></Route  >
          <Route path="/Signup"><Signup/></Route>
          <Route path="/CreatePost"><CreatePost/></Route>

    </Switch>
  )
  }
function App() {
  const[state,dispatch]=useReducer(reducer,initialState)
  return (
    
      <UserContext.Provider value={{state,dispatch}}>  
          <BrowserRouter>
                  <Navbar/>
                  <Routing/>
            </BrowserRouter>
        
      </UserContext.Provider>
        
  
  );
}

export default App;
