import style from './album.module.css';
import { useState,useEffect, useRef } from 'react';
import AlbumItem from './AlbumItem';

export default function Album(){

    let [album,setAlbum] = useState([]);
    let [title,setTitle] = useState("");
    let text = useRef(null);
   
 

    useEffect(() => {
       text.current.focus();
    },[])
 




    useEffect(() => {
       async function data(){

        var res = await fetch('https://jsonplaceholder.typicode.com/albums');
        var data = await res.json();
        setAlbum(data);
    
    }
        data();
    },[]);


    async function handleAddAlbum(){

        var res = await fetch('https://jsonplaceholder.typicode.com/albums',{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                title : title
            })
        });
        var data = await res.json();

        setAlbum([data,...album]);

        setTitle("");


    
    }


 


    async function handleDeleteButton(item){

        var res = await fetch(`https://jsonplaceholder.typicode.com/albums/${item.id}`,{
            method : 'DELETE'
        })

        var data = await res.json();

        console.log(data);

        var i = album.indexOf(item);

        setAlbum(album.filter((item,index) => index !== i));



    }

    async function handleSetButton(item,title){

            var res = await fetch(`https://jsonplaceholder.typicode.com/albums/${item.id}`,{
            method : 'PUT',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                title : title
            })
        });
        var data = await res.json();

 

        var index = album.indexOf(item);

        var updatedAlbum = [];


        if (index === 0) {
            updatedAlbum.push(data);
            for(let i = index + 1; i < album.length; i++) {
                updatedAlbum.push(album[i]);
            }

            setAlbum(updatedAlbum);
        }else if (index === data.length){

          for (let i = 0 ; i < album.length-1; i++) {
              updatedAlbum.push(album[i]);
          }

          updatedAlbum.push(data);
          setAlbum(updatedAlbum);

        }else{

            for (let i = 0; i < index; i++) {
                updatedAlbum.push(album[i]);
            }

            updatedAlbum.push(data);

            for (let i = index + 1; i < album.length; i++){
                updatedAlbum.push(album[i]);
            }

            setAlbum(updatedAlbum);
        }

    }




    return (
    <>
    <span>Albums</span>
    <div className = {style.text}>
    <input type='text' onChange={(e) => {setTitle(e.target.value)}} ref = {text} value = {title} placeholder='enter the title'></input>
    <button onClick={handleAddAlbum}>Add Album</button>
    </div>
    <div className= {style.container}>
      
     {album.map((item,index) => {
        return(

            <AlbumItem key = {index} item = {item} handleDeleteButton = {handleDeleteButton} handleSetButton = {handleSetButton}/>

       
        )
     })}
    </div>
    
    
    </>
    );
}