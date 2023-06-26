import style from './album.module.css';
import { useState } from 'react';

export default function AlbumItem(props){

    let [text,setText] = useState(false);
    let [title ,setTitle] = useState("")

    

    


    return (<>
    
    
     <div className= {style.child}> 
        <h4>Title : {props.item.title}</h4>
        <h4>Id : {props.item.id}</h4>

        <button onClick={() => setText(!text)}>Edit</button>
        <button onClick={() => props.handleDeleteButton(props.item)}>Delete</button>
        {text ? <p><input type='text' placeholder='set the title' className= {style.setText} onChange={(e) => {setTitle(e.target.value)}} value={title}></input><button onClick={() =>{props.handleSetButton(props.item,title);setTitle("");}}>Set</button></p> : ""}
        
        
     </div>
    
    
    </>)
} 