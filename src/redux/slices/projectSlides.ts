import axios from 'axios';
//@ruduxjs
import { Dispatch, createSlice } from '@reduxjs/toolkit';
//hooks
import { CYBERTOKEN } from '~/hooks/const';
import { getLocal, setLocal } from '~/hooks/localStogate';
//type
import { Category } from '~/type/category.type';
import { CreateProject, Projects, UpdateProject } from '~/type/projects.type';
import { ProjectDetail } from '~/type/task.type';
import { User } from '~/type/user.type';
//------------------------------------------------------

interface ProjectList{
  listProjects: Projects[],
  projectCategory: Category[] ,
  projectDetails: ProjectDetail,
};

const listProject = getLocal('list_project');
const listCategory = getLocal('list_category');
const projectDetail = getLocal('project_detail');
const projDetailDefault = {
  lstTask: [
    {
      lstTaskDeTail: [
        {
          priorityTask: { priorityId: 0, priority: '' },
          taskTypeDetail: { id: 0, taskType: '' },
          assigness: [
            {
              id: 0,
              avatar: '0',
              name: '',
              alias: '',
            },
          ],
          lstComment: [
            {
              id: 0,
              idUser: 0,
              name: '',
              avatar: '',
              commentContent: '',
            },
          ],
          taskId: 0,
          taskName: '',
          alias: '',
          description: '',
          statusId: '',
          originalEstimate: 0,
          timeTrackingSpent: 0,
          timeTrackingRemaining: 0,
          typeId: 0,
          priorityId: 0,
          projectId: 0,
        },
      ],
      statusId: '',
      statusName: '',
      alias: '',
    },
  ],
  members: [
    {
      userId: 0,
      name: '',
      avatar: '',
      email: null,
      phoneNumber: null,
    },
  ],
  creator: { id: 0, name: '0' },
  id: 0,
  projectName: '0',
  description: '',
  projectCategory: { id: 0, name: '' },
  alias: '',
};

const initialState: ProjectList = {
  listProjects: listProject || [],
  projectCategory: listCategory || [],
  projectDetails: projectDetail || projDetailDefault,
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
  getProjDetail(state, action){
    state.projectDetails = action.payload
    setLocal('project_detail',action.payload)
  }
  },
})

export default slice.reducer;

export const {
  setListProject, 
  delProject, 
  setProjectCategory, 
  updateProject, 
  addMemProj, 
  delMemProj,
  getProjDetail
} = slice.actions;
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
  hanldeSetValue?: (value: Projects) => void ,
  ) {
  return async (dispatch: any) => {   
    try {
      const resp = await axios({
        url: `https://jiranew.cybersoft.edu.vn/api/Project/getProjectDetail?id=${id}`,
        method: 'get',
        headers: {
          TokenCybersoft: ` ${CYBERTOKEN}`,
          Authorization: `Bearer ${getLocal('access_token')}`,
        },
      });
      dispatch(getProjDetail(resp.data.content))
      if(hanldeSetValue){
        hanldeSetValue(resp.data.content)
      }
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
  return async () => {   
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