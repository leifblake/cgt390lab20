import React, { useState, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ModeContext } from './ModeContext';

import useProfiles from './hooks/useProfiles';
import Navbar        from './components/Navbar';
import Home          from './pages/Home';
import AddProfile    from './pages/AddProfile';
import About         from './pages/About';
import NotFound      from './pages/NotFound';
import ProfileDetail from './pages/ProfileDetail';
import EditProfile   from './pages/EditProfile';
import Login         from './pages/Login';
import Register      from './pages/Register';
import Logout        from './pages/Logout';
import Chatbox       from './components/Chatbox';

import './index.css';

const App = () => {
  const { mode, toggleMode } = useContext(ModeContext);

  const { profiles, setProfiles, addProfile } = useProfiles();

  const [searchTerm, setSearchTerm]       = useState('');
  const [selectedRole, setSelectedRole]   = useState('');

  return (
    <div className={`app ${mode}`}>
      <header>
        <Navbar theme={mode} toggleTheme={toggleMode} />
      </header>
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                profiles={profiles}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedRole={selectedRole}
                setSelectedRole={setSelectedRole}
              />
            }
          />
          <Route
            path="/add-profile"
            element={<AddProfile addProfile={addProfile} theme={mode} />}
          />
          <Route path="/about" element={<About />} />
          <Route
            path="/profile/:id"
            element={<ProfileDetail profiles={profiles} theme={mode} />}
          />
          <Route
            path="/profile/:id/edit"
            element={
              <EditProfile
                profiles={profiles}
                setProfiles={setProfiles}
                theme={mode}
              />
            }
          />
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout"   element={<Logout />} />
          <Route path="*"          element={<NotFound />} />
        </Routes>
      </main>

      {/* Chat helper always visible */}
      <Chatbox />
    </div>
  );
};

export default App;
