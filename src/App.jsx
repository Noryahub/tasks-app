import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Update from './update'
import Read from './read'
import Create from './Create'
import Home from './Home'
import AuthRouter from './Auth/AuthRouter'
import AuthGuard from './helpers/AuthGuard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard/>}>
            <Route path='/' element={<Home />}></Route>
            <Route path='/create' element={<Create/>}></Route>
            <Route path='/update/:id' element={<Update />}></Route>
            <Route path='/read/:id' element={<Read />}></Route>
        </Route>
        <Route path='/auth/*' element={<AuthRouter />} />
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
