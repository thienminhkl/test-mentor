import { Fragment, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//templates
import HomeTemplate from './templates/HomeTemplate';
//components
import ScrollToTop from './components/ScrollToTop';
import SignTemplate from './templates/SignTemplate';
//-------------------------------------------------------------------------------

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="" element={<SignTemplate />}>
            <Route index path="login" element={<Login />}></Route>
            <Route path="register" element={<Register />}></Route>
          </Route>
          <Route path="" element={<HomeTemplate />}>
            <Route
              index
              path="projectmanagement"
              element={<ProjectManagement />}
            />
            <Route path="release" element={<Release />} />
            <Route path="projectDetails">
              <Route path=":id" element={<ProjectDetail />} />
            </Route>
            <Route path="createProject" element={<CreateProject />} />
            <Route path="editProject">
              <Route path=":id" element={<EditProject />} />
            </Route>
            <Route path="createTask" element={<CreateTask />} />
            <Route path="editTask">
              <Route path=":id" element={<EditTask />} />
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
const Register = lazy(() => import('./pages/Register'));
const CreateProject = lazy(() => import('./pages/CreateProject'));
const EditProject = lazy(() => import('./pages/EditProject'));
const Release = lazy(() => import('./pages/Release'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const CreateTask = lazy(() => import('./pages/CreateTask'));
const EditTask = lazy(() => import('./pages/EditTask'));
