import axios from 'axios';
//@ruduxjs
import { Dispatch, createSlice } from '@reduxjs/toolkit';
//hooks
import { CYBERTOKEN } from '~/hooks/const';
import { getLocal, setLocal } from '~/hooks/localStogate';
//type
import { Category } from '~/type/category.type';
import { CreateProject, Projects, UpdateProject } from '~/type/projects.type';
import { User } from '~/type/user.type';
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
    const IndexProj = state.listProjects.findIndex((proj) => proj.id === action.payload);
    state.listProjects.splice(IndexProj, 1)
    setLocal('list_project', state.listProjects)
   },
   setProjectCategory(state, action){
    state.projectCategory = action.payload
   },
   updateProject(state, action){
    const IndexProj = state.listProjects.findIndex((proj) => proj.id === action.payload);
    state.listProjects[IndexProj] = action.payload
    setLocal('list_project', state.listProjects)
   },
   addMemProj(state, action){
    const IndexProj = state.listProjects.findIndex((proj) => proj.id === action.payload.pId);
    state.listProjects[IndexProj].members.push(action.payload.user)
    setLocal('list_project', state.listProjects)
   },
   delMemProj(state, action){
    const IndexProj = state.listProjects.findIndex((proj) => proj.id === action.payload.pId);
    const IndexMem = state.listProjects[IndexProj].members.findIndex((mem) => mem.userId === action.payload.uId)
    state.listProjects[IndexProj].members.splice(IndexMem, 1)
    setLocal('list_project', state.listProjects)
  },
  },
})

export default slice.reducer;

export const {setListProject, delProject, setProjectCategory, updateProject, addMemProj, delMemProj} = slice.actions;


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
      dispatch(setListProject(resp.data.content));
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
          url: `https://jiranew.cybersoft.edu.vn/api/Project/deleteProject?projectId=${id}`,
          method: 'delete',
          headers: {
            TokenCybersoft: ` ${CYBERTOKEN}`,
            Authorization: `Bearer ${getLocal('access_token')}`,
          },
        });
        dispatch(delProject(id))
        alert('Project deleted!')      
      } catch (error: any) {
        alert(`You don't have permission to delete this project!`);
      }
    }
  } 
};

export function handleGetProjectDetail(
  id: string | number | undefined,
  hanldeSetValue: (value: Projects) => void,
  ) {
  return async () => {   
    try {
      const resp = await axios({
        url: `https://jiranew.cybersoft.edu.vn/api/Project/getProjectDetail?id=${id}`,
        method: 'get',
        headers: {
          TokenCybersoft: ` ${CYBERTOKEN}`,
          Authorization: `Bearer ${getLocal('access_token')}`,
        },
      });
      hanldeSetValue(resp.data.content)
    } catch (error: any) {
      console.error(error);
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

export function handleAddProject(
  value: CreateProject,
  nav: (link: string) => void
  ) {
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
        nav('/projectmanagement');
      } catch (error: any) {
        console.error(error);
      }
  } 
};

export function handleUpdateProject( 
  value: UpdateProject, 
  project: Projects | undefined,
  nav: (link: string) => void
  ) {
  return async (dispatch: any) => {   
      try {
        await axios({
          url: `https://jiranew.cybersoft.edu.vn/api/Project/updateProject?projectId=${value.id}`,
          method: 'put',
          headers: {
            TokenCybersoft: ` ${CYBERTOKEN}`,
            Authorization: `Bearer ${getLocal('access_token')}`,
          },
          data: value
        });
        dispatch(updateProject({...project, ...value}))
        alert('Update success!')      
        nav('/projectmanagement');
      } catch (error: any) {                
        alert(`You not allow to edit this project!`);
      }
  } 
};

export function handleAddUserProj(
  pId: string | number,
  user: User | undefined | null
) {
  return async (dispatch: any) => {   
    try {
      await axios({
        url: `https://jiranew.cybersoft.edu.vn/api/Project/assignUserProject`,
        method: 'post',
        headers: {
          TokenCybersoft: ` ${CYBERTOKEN}`,
          Authorization: `Bearer ${getLocal('access_token')}`,
        },
        data: {
          projectId: pId,
          userId: user?.userId,
        },
      });
      dispatch(addMemProj({pId, user}))
    } catch (error: any) {
      alert(error.response.data.message);
    }
  } 
};

export function handleDeleteUserProj(
  pId: string | number,
  uId: string | number
) {
  return async (dispatch: any) => {   
    if (window.confirm('Are you sure to delete this user out of project')) {
      try {
        await axios({
          url: `https://jiranew.cybersoft.edu.vn/api/Project/removeUserFromProject`,
          method: 'post',
          headers: {
            TokenCybersoft: ` ${CYBERTOKEN}`,
            Authorization: `Bearer ${getLocal('access_token')}`,
          },
          data: {
            projectId: pId,
            userId: uId,
          },
        });
        dispatch(delMemProj({pId, uId}))
      } catch (error: any) {
        alert(error.response.data.message);
      }
    }
  } 
};