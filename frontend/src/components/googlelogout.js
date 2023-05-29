import React from 'react';
import { GoogleLogout } from 'react-google-login';

const clientId =
  '212196917280-pi8quu1h0au85dp5bsf5avv8ruqkch99.apps.googleusercontent.com';

function Logout() {
  const onSuccess = () => {
    console.log('Logout made successfully');
    alert('Logout made successfully ✌');
  };

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      ></GoogleLogout>
    </div>
  );
}

export default Logout;