import React, { useImperativeHandle } from 'react'
import eye from "./hide.svg"
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { useRef ,useState,forwardRef} from 'react'
import showing from "./showing.svg"
const Manager =forwardRef(({addelement},refo) => {
  useImperativeHandle(refo,()=>{
    return {
      internal:internalHandleEditing,
      make_new:make_new
    }
  })
    const [urll, seturll] = useState('')
    const [pass, setpass] = useState('')
    const [name, setname] = useState('')
    const ref=useRef();
    const show_pass=(param)=>{
     alert("show password")
     console.log(ref.current.src)
     if(ref.current.src.includes("showing.svg")){
        ref.current.src=eye;
     }
     else{
      ref.current.src=showing;
     }

    
    }
    const showdetail=(param)=>{
      console.log("hello");
  let  arr={
      'Url' :urll,
      'Name':name,
       'password':pass
    }
    console.log(arr);
    if(pass.length>3){
      addelement(arr)
      // toast('🦄 Saved Succesfully!', {
      //   position: "top-right",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light"
      //   })
    }
   else {
    toast('🦄 Password is too short!', {
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
  
  
  }
  const internalHandleEditing = (use_name, password, link) => { 
    seturll(link);
    setname(use_name);
    setpass(password);
    console.log("success");
    toast('🦄 Editing!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light"
      })
  };
  const changei=(item)=>{
    seturll(item.target.value);
    console.log(urll);
  }
  const changename=(item)=>{
    setname(item.target.value);
    console.log(name);
  }
  const changepass=(item)=>{
    setpass(item.target.value);
    console.log(pass);
  }
  const make_new=()=>{
    seturll("");
    setname("");
    setpass("");
  }
  
    return (
      <>
  <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition= "Bounce"
/>
{/* Same as */}
<ToastContainer />
      <div className='w-full flex justify-center py-4 pt-10'>
          <div className='w-3/5  max-[550px]:w-full'>
              <div className='flex flex-col justify-center w-full items-center'>
                  <span className="text-3xl">PassMg - manage your data</span>
                  <span className='text-xl'>Your own Password Manager</span>
              </div>
              <div className='flex flex-col gap-6 pt-4'>
                  <input type="text"  value={urll}  onChange={changei}  className=' rounded-xl text-black h-8' name="" id="" placeholder=' Enter website URL' />
                <div className='flex gap-8 w-full'>
                <input type="text" value={name} onChange={changename} className='rounded-xl text-black h-8 w-[75%]' name="" id=""placeholder=' Enter Username' />
                 <div className='flex bg-white h-8 rounded-xl pr-2'>
                 <input type="password"  value={pass} onChange={changepass} className='rounded-xl text-black bg-white w-44' placeholder=' Enter you password' />
                 <img src={eye} ref={ref}className= 'rounded-xl w-5 hover:cursor-pointer bg-white  max-[550px]:hidden'  alt="" onClick={show_pass} />
                 </div>
                </div>
                    
              </div>
           
            
               <div className='flex pt-8 border-white justify-center items-center '>
              
                 <div className='flex bg-green-800 w-24 items-center justify-center rounded-xl border-2 border-white h-10 hover:cursor-pointer text-white'>
                 <div className="do_animation bg-transparent invert"></div>
               <button onClick={showdetail}>Save</button>
                 </div>
  
               </div>
        
          </div>
      </div></>
    )
  }
)

export default Manager