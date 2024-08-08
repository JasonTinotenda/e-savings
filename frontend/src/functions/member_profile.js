import axios from 'axios';
import React, { useEffect, useState } from 'react';

const MemberProfile = ({ memberId }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/members/profile/${memberId}/`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      setProfile(response.data);
    })
    .catch(error => {
      console.error('There was an error fetching the member profile!', error);
    });
  }, [memberId]);

  if (!profile) return <div>Loading...</div>;

  return (
    <div>
      <h1>{profile.user.username}'s Profile</h1>
      <p>Email: {profile.user.email}</p>
      <p>First Name: {profile.user.first_name}</p>
      <p>Last Name: {profile.user.last_name}</p>
      <p>Phone: {profile.phone}</p>
      <p>Address: {profile.address}</p>
    </div>
  );
};

export default MemberProfile;
