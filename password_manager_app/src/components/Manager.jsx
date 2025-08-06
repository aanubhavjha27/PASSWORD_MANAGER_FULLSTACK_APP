import React, { useState, useEffect, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';


const Manager = () => {
  const passwordref = useRef()
  var passtoken = 0
  const [form, setform] = useState({ site: "", username: "", password: "" })
  const [passwordarray, setpasswordarray] = useState([])

  const getpasswords=async()=>{
    let req=await fetch("http://localhost:3000/")
    let passwords = await req.json()
    let passwordarray;

      setpasswordarray(passwords)
  }
  useEffect(() => {
    getpasswords()
    

  }, [])

  const copytext = (text) => {
    navigator.clipboard.writeText(text)
    toast('copied to clipboard', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",

    });
  }

  const showthepassword = () => {
    if (passtoken == 0) {
      passwordref.current.type = "text"
      passtoken = 1;
    }
    else if (passtoken == 1) {
      passwordref.current.type = "password"
      passtoken = 0;
    }


  }



  const savepasssword = async() => {
    console.log(form)
    setpasswordarray([...passwordarray, {...form,id:uuidv4()}])
    
    //localStorage.setItem("passwords", JSON.stringify([...passwordarray, {...form,id:uuidv4()}]))
    console.log([...passwordarray, form])
     let res =  await fetch ("http://localhost:3000/",{method:"POST",headers:{"Content-Type":"application/json"},
    body:JSON.stringify({...form,id:uuidv4()})})

  }

  const deletingpassword=async(id)=>{
    console.log("deleting password with id,", id)
    
    setpasswordarray(passwordarray.filter(item=>item.id!==id))
   let res =  await fetch ("http://localhost:3000/",{method:"DELETE",headers:{"Content-Type":"application/json"},
    body:JSON.stringify({id})})
    // localStorage.setItem("passwords",JSON.stringify(passwordarray.filter(item=>item.id!==id)))
  }

  const handelchange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  };
  return (

    <>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"

      />
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div class="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div></div>
      <div className=' flex flex-col mx-auto bg-slate-700  items-center w-full '>

        <div className="text-white flex flex-col p-4 gap-3 w-9/10">
          <h1 className='text-4xl text font-bold text-center'>
            <span className='text-green-700'>&lt;</span>
            PASSWORD
            <span className='text-green-700'>mg/&gt;</span>

          </h1>
          <p className='text-green-600 text-lg text-center w-full'> Your own password manager</p>
          <input value={form.site} onChange={handelchange} placeholder='Enter site URL' className="text-black rounded-2xl border border-green-500 bg-slate-400 text-center py-1 px-3 w-full" type="text" name="site" id="" />
          <div className='flex gap-1.5'>

            <input value={form.username} onChange={handelchange} placeholder='Enter Username' className="text-black rounded-2xl border border-green-500 bg-slate-400 text-center py-1 px-3 w-full " type="text" name='username' />
            <div className="relative w-full">
              <input ref={passwordref} value={form.password} onChange={handelchange} placeholder='Enter Password' className="text-black rounded-2xl border border-green-500 bg-slate-400 text-center py-1 px-3 w-full " type="password" name='password' />
              <span className='absolute right-0 text-black top-1' onClick={showthepassword} >
                <lord-icon
                  src="https://cdn.lordicon.com/dicvhxpz.json"
                  trigger="click"
                >
                </lord-icon>
              </span>
            </div>



          </div>
        </div>

        <button onClick={savepasssword} className='  border-green-900 border-4 max-w-1/3 ml-6 w-1/4 my-1.5 flex justify-center items-center bg-green-500 rounded-full hover:bg-green-200' >
          <lord-icon
            src="https://cdn.lordicon.com/efxgwrkc.json"
            trigger="hover">
          </lord-icon>
          SAVE</button>
      </div >
      <div className='passwords flex-cols items-center'>
        <h2 className='mt-3  pt-4 text-1xl ml-2 font-bold'>YOUR PASSWORDS</h2>
        {passwordarray.length === 0 && <div> No passwords to show</div>}
        {passwordarray.length != 0 &&
          <table className=" table-auto mx-auto w-99/100 ">
            <thead className='bg-green-800 text-white '>
              <tr>
                <th>Site</th>
                <th>Username</th>
                <th>Password</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {passwordarray.map((item, index) => {
                return <tr key={index}>

                  <td className='  text-center bg-green-50 py-2'> <a href={item.site} target='_blank'>{item.site}</a>
                    <lord-icon className="p-1"
                      src="https://cdn.lordicon.com/wwcdwkaf.json"
                      trigger="hover"
                      onClick={() => copytext(item.site)}
                    >
                    </lord-icon></td>

                  <td className='text-center bg-green-50 py-2'>{item.username}
                    <lord-icon className="p-1"
                      src="https://cdn.lordicon.com/wwcdwkaf.json"
                      trigger="hover"
                      onClick={() => copytext(item.username)}
                    >
                    </lord-icon>
                  </td>

                  <td className='text-center bg-green-50 py-2'>{item.password}
                    <lord-icon className="p-1"
                      src="https://cdn.lordicon.com/wwcdwkaf.json"
                      trigger="hover"
                      onClick={() => copytext(item.password)}
                    >
                    </lord-icon>
                  </td>

                  <td className='text-center bg-green-50 py-2'>
                    <span onClick={()=>deletingpassword(item.id)}><lord-icon className="pt-1.5"
                      src="https://cdn.lordicon.com/oqeixref.json"
                      trigger="hover"
                    >
                    </lord-icon></span>
                    

                  </td>
                </tr>
              })}

            </tbody>
          </table>
        }
      </div>
    </>
  )
}

export default Manager