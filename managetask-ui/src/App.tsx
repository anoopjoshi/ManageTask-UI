// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

import TaskList from './components/manageTask';
import './App.css'


function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      {/* <h2 className="text-4xl text-center mt-10">Task Management</h2> */}
      <TaskList />
    </>
  )
}

export default App
