import { Fragment, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeTemplate from './templates/HomeTemplate';
import ScrollToTop from './components/ScrollToTop';
//-------------------------------------------------------------------------------

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="login" element={<Login />}></Route>
          <Route path="" element={<HomeTemplate />}>
            <Route
              index
              path="projectmanagement"
              element={<ProjectManagement />}
            />
            <Route path="release" element={<Release />} />
            <Route path="createProject" element={<CreateProject />} />
            <Route path="editProject">
              <Route path=":id" element={<EditProject />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;

const ProjectManagement = lazy(() => import('./pages/ProjectManagement'));
const Login = lazy(() => import('./pages/Login'));
const CreateProject = lazy(() => import('./pages/CreateProject'));
const EditProject = lazy(() => import('./pages/EditProject'));
const Release = lazy(() => import('./pages/Release'));
