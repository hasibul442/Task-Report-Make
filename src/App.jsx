import { useState } from 'react'
import './App.css'
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom'
import NavBar from './include/NavBar'
import Auto from './Pages/Auto'
import Manual from './Pages/Manual'
import ListUpdate from './Pages/ListUpdate'
import PercentageCalculation from './Pages/PercentageCalculation'
import Employee from './Pages/Employee'
import ProjectList from './Pages/Project/ProjectList'
import ReportConfig from './Pages/Project/ReportConfig'
import ReportConfigList from './Pages/Project/ReportConfigList'
import NoteCreate from './Pages/Note/NoteCreate'
import Login from './Pages/Auth/Login'


function App() {
  // const location = useLocation();
  return (
    <>
    <main className=''>
      <Router>
        <Routes>
          <Route path='/' element={<><NavBar isVisible={true} /><Auto /></>} />
          <Route path='/auto-task-report' element={<><NavBar isVisible={true} /><Auto /></>} />
          <Route path='/manual-task-report' element={<><NavBar isVisible={true} /><Manual /></>} />
          <Route path='/task-list-update' element={<><NavBar isVisible={true} /><ListUpdate /></>} />
          <Route path='/percentage' element={<><NavBar isVisible={true} /><PercentageCalculation /></>} />
          <Route path='/employee' element={<><NavBar isVisible={true} /><Employee /></>} />

          <Route path='/project' element={<><NavBar isVisible={true} /><ProjectList /></>} />
          <Route path='/report_config' element={<><NavBar isVisible={true} /><ReportConfig /></>} />
          <Route path='/report_list' element={<><NavBar isVisible={true} /><ReportConfigList /></>} />

          {/* Note Service */}
          <Route path='/note' element={<><NavBar isVisible={true} /><NoteCreate /></>} />
          <Route path="/login" element={<><NavBar isVisible={false} /><Login /></>} />
          {/* <Route path="/signup" element={<Signup/>}/> */}
        </Routes>
      </Router>
    </main>
      </>
  )
}

export default App
