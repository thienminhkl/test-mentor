import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { CYBERTOKEN } from '~/hooks/const';
import { deleteLocalStrgKey, getLocal, setLocal } from '~/hooks/localStogate';
import { LoginUser, RegisUser, User, UserProfile } from '~/type/user.type';
//------------------------------------------------------

interface ProfileData{
  userProfile: UserProfile | null,
  isLoggedIn: boolean
  listUser: User[],
};

const profile = getLocal('profile_data');
const isLog = Boolean(getLocal('access_token'));
const listUser = getLocal('list_user');

const initialState: ProfileData = {
  userProfile: profile,
  listUser: listUser || [],
  isLoggedIn: isLog
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.userProfile = action.payload      
    },
    logout(state){
      state.isLoggedIn = false;
      state.userProfile = null;
      deleteLocalStrgKey('access_token');
      deleteLocalStrgKey('profile_data');
    },
    setListUser(state, action){
      state.listUser = action.payload      
    }
  },
})

export default slice.reducer;

export const { login, logout, setListUser} = slice.actions;


//-------------------------------------------------------------------
export function handleLogin(
  data: LoginUser,
  navigate: (nav: string)  => void,
  handleSetError:(error: any) => void
 ) {
  return async (dispatch: any) => {    
    try {
      const resp = await axios({
        url: 'https://jiranew.cybersoft.edu.vn/api/Users/signin',
        method: 'post',
        headers: { TokenCybersoft: ` ${CYBERTOKEN}` },
        data: data
      });
      setLocal('access_token', resp.data.content.accessToken);   
      setLocal('profile_data', resp.data.content)
      dispatch(login( resp.data.content))
      alert('Đăng nhập thành công');
      window.location.reload();
      navigate('/projectmanagement');
    } catch (error) {
      handleSetError(error)
    }
  };
};

export function handleRegister(
  data: RegisUser,
  navigate: (nav: string)  => void,
  handleSetError:(error: any) => void
 ) {
  return async () => {    
    try {
      await axios({
        url: 'https://jiranew.cybersoft.edu.vn/api/Users/signup',
        method: 'post',
        headers: { TokenCybersoft: ` ${CYBERTOKEN}` },
        data: data
      });
      alert('Đăng ký thành công');
        navigate('/login');
    } catch (error) {
      handleSetError(error)
    }
  };
};

export const handleGetListUser =  (
) => {
  return async (dispatch: any) => {  
    try {
      const resp = await axios({
        url: `https://jiranew.cybersoft.edu.vn/api/Users/getUser`,
        method: 'get',
        headers: {
          TokenCybersoft: ` ${CYBERTOKEN}`,
          Authorization: `Bearer ${getLocal('access_token')}`,
        },
      });
      setLocal('list_user', resp.data.content)
      dispatch(setListUser(resp.data.content));
    } catch (error: any) {
      console.error(error);
    }
  }  
};