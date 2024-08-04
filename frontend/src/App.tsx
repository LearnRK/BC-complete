
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Dashboard } from './pages/Dashboard'
import { AppointMe } from './pages/AppointMe'
import { Resume } from './pages/Resume'
import { PrivacyPolicy } from './pages/PrivacyPolicy'
import { ChartRouter } from './pages/ChartRouter'
import { PageNotFound } from './pages/PageNotFound'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard />}/>
          <Route path='/charts/*' element={<ChartRouter />}/>
          <Route path='/privacy' element={<PrivacyPolicy />}/>
          <Route path='/resume' element={<Resume />}/>
          <Route path='/appointme' element={<AppointMe />}/>
          <Route path='/dashboard' element={<Dashboard />}/>
          <Route path='*' element={<PageNotFound />}/>
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
