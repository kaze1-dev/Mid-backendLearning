import { useState } from 'react'
import './App.css'

function App() {

  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {

    setData({ ...data, [e.target.name]: e.target.value });

  }

  const handleData = async (e) => {

    e.preventDefault();

    try {
      
      const response = await fetch('http://localhost:4000/api/v1/users/register',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify(data)
        },
  
      );

      const res = await response.json();

      if(response.ok) {
        alert('Registeration Complete');
        console.log("Server response:", res)
        localStorage.setItem("token", res.token);
      }

    } catch (error) {
      console.log("error:", error);
    }

  }

  const handleLogin = async (e) => {

    e.preventDefault();

    try {
      
      const serverRes = await fetch('http://localhost:4000/api/v1/users/login',
        {

          method: 'POST',

          headers: {

            'Content-Type': 'application/json'

          },
          body: JSON.stringify(data)

        }
      );

      const resData = await serverRes.json();

      if(serverRes.ok) {
        alert('Login successfull');
        console.log(`server response:`, resData)
      }

    } catch (error) {
      alert('Server response failed');
      console.log(error);
    }

  }

  return (
    <>
      <form onSubmit={handleLogin} className='flex  justify-center items-center mt-10 flex-col gap-8'>
        <input name = 'username' className='bg-gray-300 p-2 w-80' type="text" placeholder='Enter Username' onChange={handleChange} />
        <input name='email' onChange={handleChange} className='bg-gray-300 p-2 w-80' type="text" placeholder='Enter email' />
        <input name = 'password' onChange={handleChange} className='bg-gray-300 p-2 w-80' placeholder='Enter password' type="text" />
        <button type='submit' className='bg-gray-400 px-4 py-2 font-bold rounded-xl text-xl hover:shadow-2xl transition-all active:scale-99 hover:scale-105'>
          Login
        </button>
      </form>
    </>
  )

}

export default App
