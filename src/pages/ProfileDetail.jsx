import React from 'react';
import { useParams, Link } from 'react-router-dom';

const ProfileDetail = ({ profiles, theme }) => {
  const { id } = useParams();
  
  // Ensure the correct profile is matched using array index
  const profile = profiles[parseInt(id, 10)];

  if (!profile) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh', 
        backgroundColor: theme === 'dark' ? '#000' : '#f4f4f4' 
      }}>
        <div style={{
          backgroundColor: theme === 'dark' ? '#333' : 'white',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
          maxWidth: '400px',
          width: '100%',
          color: theme === 'dark' ? 'white' : 'black',
        }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Profile Not Found</h2>
          <p style={{ color: theme === 'dark' ? '#bbb' : '#666' }}>
            The profile you are looking for does not exist.
          </p>
          <Link to="/" style={{
            display: 'inline-block',
            marginTop: '16px',
            padding: '10px 20px',
            backgroundColor: '#007BFF',
            color: 'white',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '16px',
          }}>
            Go Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      backgroundColor: theme === 'dark' ? '#000' : '#f4f4f4' 
    }}>
      {/* Profile Card */}
      <div style={{
        backgroundColor: theme === 'dark' ? '#333' : 'white',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        maxWidth: '500px',
        width: '100%',
        color: theme === 'dark' ? 'white' : 'black',
      }}>
        
        {/* Profile Image - Same Styling as Card2 but Bigger */}
        <img 
          src={profile.image} 
          alt={profile.name} 
          style={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            objectFit: 'cover',
            marginBottom: '1rem',
          }}
        />

        {/* Profile Info */}
        <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '10px' }}>{profile.name}</h2>
        <p style={{ fontSize: '20px', color: theme === 'dark' ? '#bbb' : '#666', marginBottom: '20px' }}>
          {profile.role}
        </p>

        {/* Email & Bio - Now Centered! */}
        <div style={{ fontSize: '16px', textAlign: 'center', marginBottom: '20px' }}>
          <p><strong>Email:</strong> {profile.email ? profile.email : 'N/A'}</p>
          <p><strong>Bio:</strong> {profile.bio ? profile.bio : 'Blank'}</p>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link to={`/profile/${id}/edit`} style={{
            backgroundColor: '#F59E0B',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '16px',
          }}>
            Edit Profile
          </Link>
          <Link to="/" style={{
            backgroundColor: '#6B7280',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '16px',
          }}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
