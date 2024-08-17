import React, { useState } from 'react';

const ProfilePictureUpload = ({ currentPicture, onUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onloadend = () => {
      onUpload(reader.result); // Send base64 image to parent
    };
    reader.readAsDataURL(selectedFile);
  };

  return (
    <div>
      {currentPicture && <img src={currentPicture} alt="Profile" />}
      <input type="file" onChange={handleFileChange} />
    </div>
  );
};

export default ProfilePictureUpload;
