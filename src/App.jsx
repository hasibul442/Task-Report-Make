import { useState } from 'react'
import './App.css'
import { Navigate, Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom'
import NavBar from './include/NavBar'
import Auto from './Pages/Auto'
import AutoTotal from './Pages/AutoTotal'
import Manual from './Pages/Manual'
import ListUpdate from './Pages/ListUpdate'
import PercentageCalculation from './Pages/PercentageCalculation'
import Employee from './Pages/Employee'
import ProjectList from './Pages/Project/ProjectList'
import ReportConfig from './Pages/Project/ReportConfig'
import ReportConfigList from './Pages/Project/ReportConfigList'
import NoteCreate from './Pages/Note/NoteCreate'
import Login from './Pages/Auth/Login'
import SingUp from './Pages/Auth/SingUp'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react'
import AssignMemberList from './Pages/AssignMemberList'
import AssignMember from './Pages/Project/AssignMember'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      setLoading(false);
    });
  }, []);

  // console.log(isLoggedIn);
  function PrivateRoute({ children }) {
    const location = useLocation();
    if (loading) {
      return null; // or your loading spinner
    }
    return isLoggedIn ? children : <Navigate to="/login" state={{ from: location }} />;
  }

  return (
    <>
    <main className=''>
      <Router>
        <Routes>
          {/* Private Route */}
          <Route path='/' element={<><NavBar isVisible={true} /><Auto /></>} />
          <Route path='/auto-task-report' element={<><NavBar isVisible={true} /><Auto /></>} />
          <Route path='/total-task-report' element={<><NavBar isVisible={true} /><AutoTotal /></>} />
          <Route path='/manual-task-report' element={<><NavBar isVisible={true} /><Manual /></>} />
          <Route path='/task-list-update' element={<><NavBar isVisible={true} /><ListUpdate /></>} />
          <Route path='/percentage' element={<><NavBar isVisible={true} /><PercentageCalculation /></>} />
          <Route path='/assign/Member/list' element={<><NavBar isVisible={true} /><AssignMemberList /></>} />

          {/* Auth Route */}
          <Route path="/login" element={<><NavBar isVisible={false} /><Login /></>} />
          <Route path="/signup" element={<><NavBar isVisible={false} /><SingUp /></>} />

          {/* Private Route */}
          <Route path='/project' element={<><PrivateRoute><NavBar isVisible={true} /><ProjectList /></PrivateRoute></>} />
          <Route path='/project/member/assign' element={<><PrivateRoute><NavBar isVisible={true} /><AssignMember /></PrivateRoute></>} />
          <Route path='/report_config' element={<><PrivateRoute><NavBar isVisible={true} /><ReportConfig /></PrivateRoute></>} />
          <Route path='/report_list' element={<><PrivateRoute><NavBar isVisible={true} /><ReportConfigList /></PrivateRoute></>} />

          <Route path='/note' element={<PrivateRoute><NavBar isVisible={true} /><NoteCreate /></PrivateRoute>} />
          <Route path='/employee' element={<PrivateRoute><NavBar isVisible={true} /><Employee /></PrivateRoute>} />
        </Routes>
      </Router>
    </main>
      </>
  )
}

export default App
