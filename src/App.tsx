import { Fragment, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomeTemplate from './templates/HomeTemplate'
import ScrollToTop from './components/ScrollToTop'
//-------------------------------------------------------------------------------

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path='' element={<HomeTemplate />}>
            <Route index path='projectmanagement' element={<ProjectManagement />}></Route>
            <Route path='' element={<></>}></Route>
            <Route path='detail-project/:detailID' element={<></>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Fragment>
  )
}

export default App

const ProjectManagement = lazy(() => import('./pages/ProjectManagement'))
