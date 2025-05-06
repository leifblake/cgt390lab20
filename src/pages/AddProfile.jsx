import React from 'react';
import ProfileForm from '../components/ProfileForm';

const AddProfile = ({ addProfile, theme }) => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: '50px',
  };

  const titleStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '20px',
  };

  const formWrapperStyle = {
    width: '50%',
    maxWidth: '500px',
    padding: '20px',
    paddingBottom: '100px', // Added bottom padding
    margin: '20px auto',
    backgroundColor: theme === 'dark' ? '#333' : 'white', // Dark grey in dark mode
    color: theme === 'dark' ? 'white' : 'black', // Adjust text color for readability
    borderRadius: '10px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Add a New Profile</h1>
      <div style={formWrapperStyle}>
        <ProfileForm addProfile={addProfile} />
      </div>
    </div>
  );
};

export default AddProfile;
