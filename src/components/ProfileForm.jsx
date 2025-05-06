import React, { useReducer, useRef, useLayoutEffect } from 'react';

// Reducer function to handle form state changes
const formReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        [action.field]: action.value,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.error,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.loading,
      };
    case 'SET_PROGRESS':
      return {
        ...state,
        progress: action.progress,
      };
    default:
      return state;
  }
};

const ProfileForm = ({ addProfile }) => {
  // Use useReducer instead of useState
  const [formData, dispatch] = useReducer(formReducer, {
    name: '',
    email: '',
    role: '',
    bio: '',
    image: null,
    loading: false,
    error: '',
    progress: 0,
  });

  // useRef to focus on the name input
  const nameInputRef = useRef(null);

  // useLayoutEffect to measure and adjust form container size
  useLayoutEffect(() => {
    if (nameInputRef.current) {
      // Optionally, adjust layout based on input width or form's container
      const inputWidth = nameInputRef.current.offsetWidth;
      console.log("Name input width:", inputWidth);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    dispatch({
      type: 'SET_FIELD',
      field: name,
      value: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'SET_LOADING', loading: true });
    dispatch({ type: 'SET_ERROR', error: '' });

    if (!formData.name || !formData.email || !formData.role || !formData.bio) {
      dispatch({ type: 'SET_ERROR', error: 'All fields are required.' });
      dispatch({ type: 'SET_LOADING', loading: false });
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('role', formData.role);
    formDataToSend.append('bio', formData.bio);
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    try {
      const response = await fetch('http://localhost:5001/api/profiles', {
        method: 'POST',
        body: formDataToSend,
      });
      const result = await response.json();

      if (result.success) {
        alert('Profile saved successfully!');
        addProfile({
          name: formData.name,
          email: formData.email,
          role: formData.role,
          bio: formData.bio,
          image: formData.image ? URL.createObjectURL(formData.image) : '',
        });
      } else {
        dispatch({ type: 'SET_ERROR', error: result.message });
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      dispatch({ type: 'SET_ERROR', error: 'Please try again' });
    } finally {
      dispatch({ type: 'SET_LOADING', loading: false });
    }
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    maxWidth: '400px',
    margin: 'auto',
  };

  const formGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
  };

  const labelStyle = {
    marginBottom: '0.5rem',
  };

  const inputStyle = {
    padding: '0.5rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
  };

  const buttonStyle = {
    padding: '0.75rem',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
  };

  const buttonDisabledStyle = {
    ...buttonStyle,
    backgroundColor: '#ccc',
    cursor: 'not-allowed',
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <div style={formGroupStyle}>
        <label style={labelStyle}>Name:</label>
        <input
          ref={nameInputRef} // Add the ref here
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          style={inputStyle}
        />
      </div>
      <div style={formGroupStyle}>
        <label style={labelStyle}>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          style={inputStyle}
        />
      </div>
      <div style={formGroupStyle}>
        <label style={labelStyle}>Role:</label>
        <input
          type="text"
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
          style={inputStyle}
        />
      </div>
      <div style={formGroupStyle}>
        <label style={labelStyle}>Bio:</label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          required
          style={inputStyle}
        />
      </div>
      <div style={formGroupStyle}>
        <label style={labelStyle}>Image:</label>
        <input
          type="file"
          name="image"
          onChange={handleChange}
          style={inputStyle}
        />
      </div>
      {formData.loading && <p>Uploading: {formData.progress}%</p>}
      {formData.error && <p style={{ color: 'red' }}>{formData.error}</p>}
      <button type="submit" disabled={formData.loading} style={formData.loading ? buttonDisabledStyle : buttonStyle}>
        {formData.loading ? 'Saving...' : 'Save Profile'}
      </button>
    </form>
  );
};

export default ProfileForm;
