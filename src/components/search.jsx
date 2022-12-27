import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import './search.css'

const Search=()=>{
    const [apidata,setapidata]=useState([])
    const [arrdata,setarrdata]=useState([])
    
    const searchbook=(e)=>{
       e.preventDefault()
       let arr=[]
       for(let i=0;i<apidata.items.length;i++){
        console.log(apidata.items[i].volumeInfo.title)
        if(apidata.items[i].volumeInfo.title == e.target.value){
            console.log("hi");
            arr.push(apidata.items[i])
        }
       }
       setarrdata(arr)
       
    // apidata.items.map((item)=>{
    //     console.log(item.volumeInfo.title)
    // })
      
    }
    console.log(arrdata);
    useEffect(()=>{
        fetch('https://www.googleapis.com/books/v1/volumes?q={bookTitle}').then((res)=>{
            return res.json()
        }).then((data)=>{
            setapidata(data)
            console.log(apidata);
            // console.log(data.items)
            // console.log(apidata);
        }).catch((err)=>{console.log(err)})
    },[])
    
    return (
        <div>
            <header>
            <h1>BOOK SEARCH</h1>
            </header>
           
           <div>
                <input type="text" placeholder="Search for a book" onChange={searchbook}/>
                <button>
                    <img id="searchicon" src="https://uxwing.com/wp-content/themes/uxwing/download/user-interface/magnifier-glass-icon.svg" alt="search" />
                </button>
           </div>
           <div id="render">
           {
            arrdata.length ? 
            (
            <div >
                {arrdata.map((item)=>{
                    return (
                        <div key={item.volumeInfo.title}>
                            <a href={item.volumeInfo.infoLink}>
                            <img className="bookimage" src={item.volumeInfo.imageLinks.smallThumbnail} alt="" />
                            </a>
                            
                        </div>
                    )
                })}
            </div>
            ):(null)
           }
           </div>
        
        </div>
    )
}
export default Search;