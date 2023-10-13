import { useState } from 'react'
import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import NavBar from './include/Navbar'
import Auto from './Pages/Auto'
import Manual from './Pages/Manual'
import ListUpdate from './Pages/ListUpdate'
import PercentageCalculation from './Pages/PercentageCalculation'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <main className=''> 
          <Router>
            <NavBar />
            <Routes>
              <Route path='/' element={<Auto />} />
              <Route path='/auto-task-report' element={<Auto />} />
              <Route path='/manual-task-report' element={<Manual />} />
              <Route path='/task-list-update' element={<ListUpdate />} />
              <Route path='/percentage' element={<PercentageCalculation />} />
            </Routes>
          </Router>
      </main>
    </>
  )
}

export default App
