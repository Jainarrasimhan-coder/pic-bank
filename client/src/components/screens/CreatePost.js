import React, { useState,useEffect } from 'react'
import M from 'materialize-css'
import{useHistory} from 'react-router-dom'

function CreatePost() {
    const history=useHistory()
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");
    useEffect(()=>{
if(url){
    fetch("/createpost",{
        method:"post",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
            title,
            body,
            pic:url
            
        })
    }).then(res=>res.json())
    .then(data=>{
        
        if(data.error){
         M.toast({html:data.error,classes:"#212121 grey darken-4"})

        }
        else{
            M.toast({html:"created post successfully",classes:"#69f0ae green accent-2"})
            history.push('/')
        }
    }).catch(err=>{
        console.log(err)
    })

}
    },[url]
    )
    const postDetails = () => {

        
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "Insta-clone")
        data.append("cloud_name", "dldflos0m") //cloud name in cloudinary
        fetch("https://api.cloudinary.com/v1_1/dldflos0m/image/upload", {
                method: "post",
                body: data
            })
            .then(res => res.json())
            .then(data => {
                setUrl(data.url)
            })
            .catch(err => {
                console.log(err)
            })
         
    }


    return ( <div className = "card input-filed"
        style = {
            { margin: "30px auto", maxWidth: "500px", textAlign: "center", padding: "20px" } } >
        <input type = "text"
        placeholder = "title"
        value = { title }
        onChange = {
            (e) => setTitle(e.target.value) }
        /> <        input type = "text"
        placeholder = "body"
        value = { body }
        onChange = {
            (e) => setBody(e.target.value) }
        /> 
        <div className = "file-field input-field" >
        < div className = "btn #64b5f6 blue darken-1" >
        <span > Upload Image </span>
         <input type = "file"
        onChange = {
            (e) => setImage(e.target.files[0]) }
        /> 
        </div> <div >
        <input className = "file-path validate"
        type = "text" />
        </div> 
        </div>
         <button className = "btn waves-effect waves-light #64b5f6 blue darken-1"
        onClick = {
            () => postDetails() } >

        Submit Post </button>


        </div>
    )
}

export default CreatePost