import React,{useState,useEffect} from 'react'

// export const Home = () => {
//     const [data,setData]=useState([])
//     useEffect(()=>{
//         fetch('/allpost',{
//             headers:{
//                 "Authorization":"Bearer "+localStorage.getItem("jwt")
//             }
//         }).then(res=>res.json())
//         .then(result=>{
//             console.log(result)
//             setData(result.posts)
//         })
//     },[])
export const Home=()=>{
    return (
        
            <div>
                
  
  <div className="card home-card center-align hoverable" >
                        <h1 className="brand-logo center">Hello Happy User!!!</h1>
                     
                        <div className="card-content">
                            <h3 className="brand-logo center">Welcome to your pic bank</h3>
                        <i className="material-icons" style={{color:"red"   }}>favorite</i>
                            <h6 class="center-align">Enjoy your pic gallery</h6>

                     
                        
                        </div>
                        </div>
            </div>
                    
                      
                        
                    
                
            

        
                    
                    )
}
export default Home