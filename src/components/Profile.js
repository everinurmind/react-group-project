import React from 'react';
import DisplayRockets from './DisplayRockets';
import '../styles/Profile.css';
import DisplayMissions from './DisplayMissions';

function Profile() {
  return (
    <div className="profile">
      <DisplayMissions />
      <DisplayRockets />
    </div>
  );
}

export default Profile;
