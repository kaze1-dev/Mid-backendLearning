import './App.css'

function App() {

  return (
    <>
    <div className='flex  justify-center items-center mt-10 flex-col gap-8'>
      <input  className='bg-gray-300 p-2 w-80' type="text" placeholder='Enter Username' />
      <input className='bg-gray-300 p-2 w-80' type="text" placeholder='Enter email' />
      <input className='bg-gray-300 p-2 w-80' placeholder='Enter password' type="text" />
      <input type="number" min={0} max={99} placeholder='Enter age' className='bg-gray-300 p-2 w-80' />
      <button className='bg-gray-400 px-4 py-2 font-bold rounded-xl text-xl hover:shadow-2xl transition-all active:scale-99 hover:scale-105'>
        Register
      </button>
    </div>
    </>
  )

}

export default App
