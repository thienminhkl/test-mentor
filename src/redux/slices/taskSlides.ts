import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { CYBERTOKEN } from '~/hooks/const';
import { getLocal } from '~/hooks/localStogate';
import { Priority, Status, TaskForm, TaskType } from '~/type/task.type';
//------------------------------------------------------

const slice = createSlice({
  name: 'task',
  initialState: {},
  reducers: {},
})

export default slice.reducer;
//-------------------------------------------------------------------

export function handleGetTaskDetail(
  id: string | number | undefined,
  hanldeSetValue: (value: TaskForm & { taskId: string; }) => void ,
  ) {
  return async () => {   
    try {
      const resp = await axios({
        url: `https://jiranew.cybersoft.edu.vn/api/Project/getTaskDetail?taskId=${id}`,
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

export function handleGetStatus(
  hanldeSetValue: (value: Status[]) => void ,
  ) {
  return async () => {   
    try {
      const resp = await axios({
        url: `https://jiranew.cybersoft.edu.vn/api/Status/getAll`,
        method: 'get',
        headers: {
          TokenCybersoft: ` ${CYBERTOKEN}`,
        },
      });
        hanldeSetValue(resp.data.content)
    } catch (error: any) {
      console.error(error);
    }
  } 
};

export function handleGetPriority(
  hanldeSetValue: (value: Priority[]) => void ,
  ) {
  return async () => {   
    try {
      const resp = await axios({
        url: `https://jiranew.cybersoft.edu.vn/api/Priority/getAll`,
        method: 'get',
        headers: {
          TokenCybersoft: ` ${CYBERTOKEN}`,
        },
      });
        hanldeSetValue(resp.data.content)
    } catch (error: any) {
      console.error(error);
    }
  } 
};

export function handleGetTaskType(
  hanldeSetValue: (value: TaskType[]) => void ,
  ) {
  return async () => {   
    try {
      const resp = await axios({
        url: `https://jiranew.cybersoft.edu.vn/api/TaskType/getAll`,
        method: 'get',
        headers: {
          TokenCybersoft: ` ${CYBERTOKEN}`,
        },
      });
        hanldeSetValue(resp.data.content)
    } catch (error: any) {
      console.error(error);
    }
  } 
};

export function handleCreateTask(
  value: TaskForm,
  nav: (link: string) => void
  ) {
  return async () => {   
      try {
        await axios({
          url: `https://jiranew.cybersoft.edu.vn/api/Project/createTask`,
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
        alert(error.response.data.content);
      }
  } 
};

export function handleUpdateTask(
  value: TaskForm & {taskId: string | undefined},
  nav: (link: string) => void
  ) {
  return async (dispatch: any) => {   
      try {
        await axios({
          url: `https://jiranew.cybersoft.edu.vn/api/Project/updateTask`,
          method: 'post',
          headers: {
            TokenCybersoft: ` ${CYBERTOKEN}`,
            Authorization: `Bearer ${getLocal('access_token')}`,
          },
          data: value
        }); 
        dispatch(handleAssignToTask(value))       
        alert('Update success!')     
        nav('/projectmanagement');
      } catch (error: any) {
        console.error(error);
        alert(error.response.data.content);
      }
  } 
};

export function handleAssignToTask(
  value: TaskForm & {taskId: string | undefined},
  ) {
  return  () => {   
    value.listUserAsign.map(async(user) => 
    { 
      try {
        await axios({
          url: `https://jiranew.cybersoft.edu.vn/api/Project/assignUserTask`,
          method: 'post',
          headers: {
            TokenCybersoft: ` ${CYBERTOKEN}`,
            Authorization: `Bearer ${getLocal('access_token')}`,
          },
          data: {taskId: value.taskId,  userId: user}
        });        
      } catch (error: any) {
        console.error(error);
        alert(error.response.data.message);
      }}
    )
  } 
};