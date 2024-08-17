import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserInfo from './context/UserInfo';
import { BrowserRouter } from 'react-router-dom';
import AnimationGSAP from './context/AnimationGSAP';
import AvailableRecipes from './context/AvailableRecipes';
import UserCartContext from './context/UserCartContext';
import CheckoutValidate from './context/CheckoutValidate';
import LogRegInfo from './context/LogRegInfo';
import { GoogleOAuthProvider } from '@react-oauth/google';
import {ConfigProvider} from 'react-avatar';
import CheckoutContext from './context/CheckoutContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <GoogleOAuthProvider clientId='91412542902-rro38n65vf3j2b4m7lmh9880099kla10.apps.googleusercontent.com'>
    <ConfigProvider colors={["brown", "green", "gray"]}>
    <BrowserRouter>
    <AnimationGSAP>
      
    <UserInfo>
      <AvailableRecipes>
        <UserCartContext>
          <CheckoutValidate>
            <LogRegInfo> 
              <CheckoutContext>
                <App />
              </CheckoutContext>
            </LogRegInfo>
          </CheckoutValidate>
        </UserCartContext>
      </AvailableRecipes>
      </UserInfo>
      
    </AnimationGSAP>
    </BrowserRouter>
    </ConfigProvider>
    </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
