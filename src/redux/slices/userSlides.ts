import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import { deleteLocalStrgKey, getLocal, setLocal } from '~/hooks/localStogate';
import { CYBERTOKEN } from '~/hooks/const';
import { LoginUser, RegisUser, UserProfile } from '~/type/user.type';
//------------------------------------------------------

interface ProfileData{
  userProfile: UserProfile | null,
  isLoggedIn: boolean
};

const profile = getLocal('profile_date');
const isLog = Boolean(getLocal('access_token'));

const initialState: ProfileData = {
  userProfile: profile,
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
    }
  },
})

export default slice.reducer;

export const { login, logout} = slice.actions;


//-------------------------------------------------------------------
export function handleLogin(
  data: LoginUser,
  navigate: (nav: string)  => void,
  handleSetError:(error: any) => void
 ) {
  return async () => {    
    try {
      const resp = await axios({
        url: 'https://jiranew.cybersoft.edu.vn/api/Users/signin',
        method: 'post',
        headers: { TokenCybersoft: ` ${CYBERTOKEN}` },
        data: data
      });
      setLocal('access_token', resp.data.content.accessToken);   
      setLocal('profile_data', resp.data.content)
  
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
