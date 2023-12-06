import React,{useState} from 'react'
import Modal from '../components/Modal'

const Test = () => {
    const [count, setCount] = useState(0)



  return (
    <div className='flex space-x-3 justify-center mt-10'>
        {/* <button onClick={handleDecrement} className='bg-blue-500  text-white p-2 rounded-full'>decrease</button>
        <p className='text-3xl'>Count:{count}</p>
        <button onClick={handleIncrement} className='bg-blue-500 text-white p-2 rounded-full '>increase</button> */}
  <Modal/>
    </div>
  )
}

export default Test