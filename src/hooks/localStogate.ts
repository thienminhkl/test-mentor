export const getLocal = (key: string)=>{
  return JSON.parse(localStorage.getItem(key) as string)
};

export const setLocal = (key: string,data: any)=>{
  return localStorage.setItem(key,JSON.stringify(data))
}

export const deleteLocalStrgKey = (key: string)=>{
  return localStorage.removeItem(key)
}