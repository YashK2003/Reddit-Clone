import React from 'react';
import {useEffect} from 'react';
import { GoogleLogin } from 'react-google-login';
// refresh token
import { refreshTokenSetup } from './refreshtoken';
import {gapi} from 'gapi-script';


function Login() {
    const clientId = '212196917280-pi8quu1h0au85dp5bsf5avv8ruqkch99.apps.googleusercontent.com';
    useEffect(()=>{
        gapi.load("client:auth2",()=>{
            gapi.auth2.init({clientId:clientId});
        })
    },[])

  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);
    alert(
      `Logged in successfully welcome ${res.profileObj.name}.`
    );
    refreshTokenSetup(res);
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    // alert(
    //   `Failed to login. 😢 Please ping this to repo owner twitter.com/sivanesh_fiz`
    // );
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        style={{ marginTop: '100px' }}
        isSignedIn={true}
      />
    </div>
  );
}

export default Login;