import axios from 'axios';
import React, { useEffect, useState } from 'react';

const MemberProfile = ({ memberId }) => {
  const [member, setMember] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/members/profile/${memberId}/`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      setMember(response.data);
    })
    .catch(error => {
      console.error('There was an error fetching the member profile!', error);
    });
  }, [memberId]);

  if (!member) return <div>Loading...</div>;

  return (
    <div>
      <h2>Member Profile</h2>
      <p>Username: {member.username}</p>
      <p>Email: {member.email}</p>
    </div>
  );
};

export default MemberProfile;
