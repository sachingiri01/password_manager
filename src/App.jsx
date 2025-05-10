import { useRef, useState,useEffect } from "react";
import "./App.css";
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./components/Navbar";
import Manager from "./components/Manager";
import trash from "./components/trashs.svg";
function App({editing}) {
  const childref=useRef();
  const user_name = useRef()
  const password = useRef()
  const link = useRef()
  const [count, setCount] = useState(0);
  const [data, setdata] = useState([]);
  const [to_show, setto_show] = useState(false)
  
//   const save_to_local_storage=async(e)=>{
//     console.log(e);
//     await localStorage.setItem("key_h_ye",JSON.stringify(e));
//  }

const getpassword= async()=>{
  let req= await fetch("http://localhost:5000/");
  let data=await req.json();
 
   
     console.log("oui  ")
     console.log(data);
     console.log("opop");
       setdata(data);
    
}


 useEffect(() => {
  
   getpassword()
}, [])

   
  const addelement=async(detail)=>{
    setdata([...data,detail]);
    console.log(data);
    console.log("inside sotre")
    let res= await fetch("http://localhost:5000/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...detail,id:detail.password})})
    // save_to_local_storage(data);
    childref.current.make_new();
    setto_show(true);
  }
  const Nothing_show = () => {
    return (<>
    <p>No password to show</p>
    </>);
  };
 
  const handle_edit=async(event,id,name,link)=>{

    console.log(name)
    console.log(link)
    console.log(id)
    childref.current.internal(name,id,link);
   await handledelete(event,id);
 
  }
  const handledelete=async(event,id)=>{
    console.log("hello from trahs")
    console.log(id);
   let new_data= data.filter((item)=>{
       return item.password!=id
    })
    console.log(new_data);
    setdata(new_data);
    let res= await fetch("http://localhost:5000/",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({...new_data,id})})
  

    toast('🦄 Deleted Saved!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light"
      })
  }
  const Data=({detail})=>{
      return (
        <>
         <div className="flex">
            <div className="w-3/5 text-center max-[900px]:w-2/5 ">
              <a
                href={detail.Url}
                target="_blank"
                className="hover:text-blue-400"
                ref={link}
              >
               {detail.Url}
              </a>
            </div>
            <div className="flex w-2/5 justify-between max-[900px]:w-3/5  ">
              <div ref={user_name} className="flex text-wrap  w-20">{detail.Name}</div>
              <div ref={password} className="flex text-wrap w-20">{detail.password} </div>
              <div className="flex gap-2 pr-1">
                <button onClick={(event)=>handle_edit(event,detail.password,detail.Name,detail.Url)}>
                  <div className="pkg"></div>
                </button>
                <button onClick={(event)=>handledelete(event,detail.password)}>
                  <img src={trash}  className="w-7" alt="" />
                </button>
              </div>
            </div>
          </div>
        </>
      )
  }
  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full  bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <Navbar />
      <Manager addelement={addelement} ref={childref}/>
      <div className="w-full flex justify-center ">
        <div className="w-3/5 max-[1150px]:w-4/5 max-[550px]:w-full  ">
          <h2 className="font-bold text-xl">Your Passwords</h2>
          <div className="flex gap-1 bg-green-700 h-8 items-center px-3">
            <div className="w-3/5 text-center max-[900px]:w-2/5">Site</div>
            <div className="flex w-2/5 justify-between max-[900px]:w-3/5 ">
              <div>Username</div>
              <div>Password</div>
              <div>Action</div>
            </div>
          </div>
           {data.map(data=>{
            // return to_show?<Data key={data.password} detail={data}/>:<Nothing_show key={null}/>
            return <Data key={data.password} detail={data}/>
           })}
        </div>
      </div>
    </>
  );
}

export default App;
