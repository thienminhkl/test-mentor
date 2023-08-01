import { combineReducers } from 'redux';
// slices
import projects from './slices/projectSlides';
import user from './slices/userSlides'
// ----------------------------------------------------------------------
const rootReducer = combineReducers({
  project: projects,
  user: user
});

export default rootReducer;
