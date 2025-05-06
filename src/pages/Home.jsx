import React from 'react';
import Wrapper from '../components/Wrapper';
import { Link } from 'react-router-dom';

const Home = ({ profiles, searchTerm, setSearchTerm, selectedRole, setSelectedRole, theme }) => {
  const filteredProfiles = profiles.filter(profile => {
    const matchesSearch = profile.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole ? profile.role === selectedRole : true;
    return matchesSearch && matchesRole;
  });

  return (
    <div className={`container ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <h1 className="profile-title">Profile App</h1>
      
      <div className="filter-container">
        <input 
          type="text" 
          placeholder="Search by name..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        <select 
          value={selectedRole} 
          onChange={(e) => setSelectedRole(e.target.value)} 
        >
          <option value="">Filter by role</option>
          <option value="Web Developer">Web Developer</option>
          <option value="UI/UX Designer">UI/UX Designer</option>
          <option value="Sound Designer">Sound Designer</option>
          <option value="Animation and VFX">Animation and VFX</option>
          <option value="Illustrator">Illustrator</option>
        </select>
        <button onClick={() => { setSearchTerm(''); setSelectedRole(''); }}>Reset</button>
      </div>

      <Wrapper>
        {filteredProfiles.map((profile, index) => (
          <div 
            key={index} 
            className="profile-container"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '250px', 
              margin: '15px',
            }}
          >
            {/* Card Component */}
            <div 
              className="profile-card"
              style={{
                width: '100%',
                padding: '20px',
                borderRadius: '12px',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                backgroundColor: theme === 'dark' ? '#333' : 'white',  // ✅ Dark grey in dark mode
                textAlign: 'center',
                color: theme === 'dark' ? 'white' : 'black',  // ✅ White text in dark mode
              }}
            >
              <img
                src={profile.image}
                alt={profile.name}
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginBottom: '1rem',
                }}
              />
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '5px' }}>{profile.name}</h2>
              <p style={{ color: theme === 'dark' ? '#ccc' : '#666', marginBottom: '10px' }}>{profile.role}</p>
            </div>

            {/* "View Profile" Button */}
            <Link 
              to={`/profile/${index}`}
              style={{
                marginTop: '10px',  
                backgroundColor: '#FACC15',
                color: 'black',
                padding: '10px 15px',
                borderRadius: '6px',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'inline-block',
                width: '100%',
                textAlign: 'center',
                transition: 'background-color 0.2s ease-in-out',
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#EAB308'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#FACC15'}
            >
              View Profile
            </Link>
          </div>
        ))}
      </Wrapper>
    </div>
  );
};

export default Home;
