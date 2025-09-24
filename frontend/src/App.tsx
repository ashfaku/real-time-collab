import { useState } from 'react'
import './App.css'
import './components/defaultlogin.tsx';
import DefaultLogin from './components/defaultlogin';

function App() {
  const [count, setCount] = useState(0)

  return (
    <DefaultLogin />
  )
}

export default App
