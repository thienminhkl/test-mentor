import { combineReducers } from 'redux';
// slices
import projects from './slices/projectSlides';

// ----------------------------------------------------------------------
const rootReducer = combineReducers({
  project: projects,
});

export default rootReducer;
