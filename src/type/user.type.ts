export type User = {
  userId:      number;
  name:        string;
  avatar:      string;
  email:       string;
  phoneNumber: string;
}

export type RegisUser = {
  email:       string;
  passWord:    string;
  name:        string;
  phoneNumber: string;
}

export type LoginUser = {
  email:       string;
  passWord:    string;
}

export type UserProfile = {
  id:          number;
  email:       string;
  avatar:      string;
  phoneNumber: string;
  name:        string;
  accessToken: string;
}
