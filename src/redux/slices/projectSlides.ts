import { Dispatch, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { CYBERTOKEN } from '~/hooks/const';
import { getLocal, setLocal } from '~/hooks/localStogate';
import { Category } from '~/type/category.type';
import { CreateProject, Projects, UpdateProject } from '~/type/projects.type';

//------------------------------------------------------
interface ProjectList{
  listProjects: Projects[],
  projectCategory: Category[] ,
};

const listProject = getLocal('list_project');
const listCategory = getLocal('list_category');

const initialState: ProjectList = {
  listProjects: listProject,
  projectCategory: listCategory,
};

const slice = createSlice({
  name: 'listProject',
  initialState,
  reducers: {
   setListProject(state, action){
    state.listProjects = action.payload
   },
   delProject(state, action){
    const indexById = state.listProjects.findIndex((proj) => proj.id === action.payload);
    state.listProjects.splice(indexById, 1)
    setLocal('list_project', state.listProjects)
   },
   setProjectCategory(state, action){
    state.projectCategory = action.payload
   },
   updateProject(state, action){
    const indexById = state.listProjects.findIndex((proj) => proj.id === action.payload);
    if(indexById !== -1){
      state.listProjects[indexById] = action.payload
    }
   }
  },
})

export default slice.reducer;

export const {setListProject, delProject, setProjectCategory, updateProject} = slice.actions;


//-------------------------------------------------------------------

export function handleGetListProjects() {
  return async (dispatch: Dispatch) => {
    try {
      const resp = await axios({
        url: `https://jiranew.cybersoft.edu.vn/api/Project/getAllProject`,
        method: 'get',
        headers: { TokenCybersoft: ` ${CYBERTOKEN}` },
      })  
      setLocal('list_project', resp.data.content)
      dispatch(slice.actions.setListProject(resp.data.content));
    } catch (error) {
      console.error(error);
    }
  };
};

export function handleDeleteProject(
  id: string | number | undefined
  ) {
  return async (dispatch: any) => {   
    if (window.confirm('Are you sure to delete this project')) {
      try {
        await axios({
          url: `/api/Project/deleteProject?projectId=${id}`,
          method: 'delete',
          headers: {
            TokenCybersoft: ` ${CYBERTOKEN}`,
            Authorization: `Bearer ${getLocal('access_token')}`,
          },
        });
        dispatch(delProject(id))
        alert('Đã xóa khóa học !')      
      } catch (error: any) {
        console.error(error);
      }
    }
  } 
};

export function handleGetProjectCategory() {
  return async (dispatch: Dispatch) => {
    try {
      const resp = await axios({
        url: `https://jiranew.cybersoft.edu.vn/api/ProjectCategory`,
        method: 'get',
        headers: { TokenCybersoft: ` ${CYBERTOKEN}` },
      })  
      setLocal('list_category', resp.data.content)
      dispatch(setProjectCategory(resp.data.content));
    } catch (error) {
      console.error(error);
    }
  };
};

export function handleAddProject(value: CreateProject) {
  return async (dispatch: any) => {   
      try {
        await axios({
          url: `https://jiranew.cybersoft.edu.vn/api/Project/createProjectAuthorize`,
          method: 'post',
          headers: {
            TokenCybersoft: ` ${CYBERTOKEN}`,
            Authorization: `Bearer ${getLocal('access_token')}`,
          },
          data: value
        });
        alert('Create success!')      
      } catch (error: any) {
        console.error(error);
      }
  } 
};

export function handleUpdateProject( value: UpdateProject, project: Projects | undefined) {
  return async (dispatch: any) => {   
      try {
        await axios({
          url: `/api/Project/updateProject?projectId=${value.id}`,
          method: 'put',
          headers: {
            TokenCybersoft: ` ${CYBERTOKEN}`,
            Authorization: `Bearer ${getLocal('access_token')}`,
          },
          data: value
        });
        dispatch(updateProject({...project, ...value}))
        alert('Update success!')      
      } catch (error: any) {
        console.error(error);
      }
  } 
};