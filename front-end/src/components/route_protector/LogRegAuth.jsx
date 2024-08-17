import React from 'react'
import { useUserinfo } from '../../context/UserInfo';
import { Navigate } from 'react-router';

function LogRegAuth({children}) {
  
  const {isLogin} = useUserinfo();

  return isLogin ? <Navigate to={'/'} /> : children
}

export default LogRegAuth
