    import React,{useEffect,useState,useContext} from 'react';
    import { UserContext } from '../../App';

export const Profile = () => {
    const [mypics,setPics]=useState([])
    const {state,dispatch}= useContext(UserContext)
    useEffect(()=>{
        fetch('/mypost',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=> res.json())
        .then(result=>{
            setPics(result.mypost)
            console.log(result)
        })
        },[])
    
    return (
        <div style={{maxWidth:"550px", margin:"0px auto" }}>
            <div style={{
                display:"flex",
                justifyContent:"space-around",
                margin:"18px 0px",borderBottom:"1px solid grey"
            }}>
                <div>
                    <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" />
                </div>
                <div>
                    <h4>{state?state.name:"loading"}</h4>
                    <div style={{display:"flex",justifyContent:"space-around",width:"100%"}}>
                        <h5 className="nav-wrapper">Here is  your pic gallery!!</h5>
                
            
                    </div>
                </div>
            
            
            
            
            </div>

            <div className="gallery">
                {
                    mypics.map(item=>{
                        return(
                            <div style={{
                              
                                margin:"18px 0px",borderBottom:"1px solid grey"
                            }}>
                              <h6>{item.title }</h6>
                        <p>{item.body}</p>
                        <img key={item._id}  className="item"src={item.photo} alt={item.title}/>
                            </div>
   
                        
                        
                         

                        )
                    })
                }
         
</div>
        </div>
    )
        }

export default Profile