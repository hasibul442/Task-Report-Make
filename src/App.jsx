import { useState } from 'react'
import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
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


              <Route path='/employee' element={<Employee />} />
              <Route path='/project' element={<ProjectList />} />
              <Route path='/report_config' element={<ReportConfig />} />
              <Route path='/report_list' element={<ReportConfigList />} />

              {/* Note Service */}
              <Route path='/note' element={<NoteCreate />} />
            </Routes>
          </Router>
      </main>
    </>
  )
}

export default App
