import React from 'react'
  import pic from "./ggit.svg"
const Navbar = () => {
  return (
  <div className='bg-[#2b2d2c] flex gap-3 justify-around text-white h-12 items-center  max-[550px]:w-full'>
    
    <div className="logo text-white text-xl">PassMg</div>  

    <div><ul className='flex gap-5'>
      <li>
        <a href="/">Home</a>
      </li>
      <li>
        <a href="/">About</a>
      </li>
      <li>
        <a href="/">Contact us</a>
      </li>
    </ul></div>
    <div className="link bg-green-600 rounded-xl h-8 border border-white flex items-center">
   <img src={pic} alt=""className='bg-red w-10' />
      <a href="/">Github</a>
    </div>
  </div>
  )
}

export default Navbar