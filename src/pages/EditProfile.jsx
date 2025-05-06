import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const EditProfile = ({ profiles, setProfiles, theme }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const profileIndex = parseInt(id, 10);
  const profile = profiles[profileIndex];

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

  const [formData, setFormData] = useState({
    name: profile.name,
    role: profile.role,
    email: profile.email || '',
    bio: profile.bio || '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProfiles = [...profiles];
    updatedProfiles[profileIndex] = { ...profile, ...formData };
    setProfiles(updatedProfiles);
    navigate(`/profile/${id}`);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${profile.name}'s profile?`)) {
      const updatedProfiles = profiles.filter((_, index) => index !== profileIndex);
      setProfiles(updatedProfiles);
      navigate('/');
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      backgroundColor: theme === 'dark' ? '#000' : '#f4f4f4' 
    }}>
      {/* Profile Edit Card */}
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
        
        {/* Profile Image */}
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

        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Edit Profile</h2>

        {/* Profile Edit Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          
          <label style={{ textAlign: 'left' }}>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{
              padding: '10px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              backgroundColor: theme === 'dark' ? '#444' : 'white',
              color: theme === 'dark' ? 'white' : 'black',
            }}
          />

          <label style={{ textAlign: 'left' }}>Role:</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={{
              padding: '10px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              backgroundColor: theme === 'dark' ? '#444' : 'white',
              color: theme === 'dark' ? 'white' : 'black',
            }}
          />

          <label style={{ textAlign: 'left' }}>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{
              padding: '10px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              backgroundColor: theme === 'dark' ? '#444' : 'white',
              color: theme === 'dark' ? 'white' : 'black',
            }}
          />

          <label style={{ textAlign: 'left' }}>Bio:</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            style={{
              padding: '10px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              backgroundColor: theme === 'dark' ? '#444' : 'white',
              color: theme === 'dark' ? 'white' : 'black',
              height: '80px',
            }}
          />

          {/* Buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            <button type="submit" style={{
              backgroundColor: '#34D399',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
            }}>
              Save Changes
            </button>
            <button onClick={handleDelete} style={{
              backgroundColor: '#EF4444',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
            }}>
              Delete Profile
            </button>
            <Link to={`/profile/${id}`} style={{
              backgroundColor: '#6B7280',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '16px',
            }}>
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
