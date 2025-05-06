// src/hooks/useProfiles.js
import { useState, useEffect } from 'react';

import headshot1 from '../assets/headshot1.png';
import headshot2 from '../assets/headshot2.png';
import headshot3 from '../assets/headshot3.png';
import headshot4 from '../assets/headshot4.png';
import headshot5 from '../assets/headshot5.png';
import headshot6 from '../assets/headshot6.png';
import headshot7 from '../assets/headshot7.png';
import headshot8 from '../assets/headshot8.png';

const defaultProfiles = [
  { id: '1', name: 'Isabelle', role: 'Web Developer',     image: headshot1 },
  { id: '2', name: 'Tom Nook',  role: 'UI/UX Designer',    image: headshot2 },
  { id: '3', name: 'KK Slider', role: 'Sound Designer',    image: headshot3 },
  { id: '4', name: 'Celeste',   role: 'Animation and VFX', image: headshot4 },
  { id: '5', name: 'Mabel',     role: 'Animation and VFX', image: headshot5 },
  { id: '6', name: 'Rover',     role: 'Web Developer',     image: headshot6 },
  { id: '7', name: 'Harriet',   role: 'UI/UX Designer',    image: headshot7 },
  { id: '8', name: 'Kappn',     role: 'Illustrator',       image: headshot8 },
];

export default function useProfiles() {
  // start with your eight defaults
  const [profiles, setProfiles] = useState(defaultProfiles);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await fetch('http://localhost:5001/api/profiles');
        const data = await res.json();
        // merge fetched onto your defaults
        setProfiles([...defaultProfiles, ...data]);
      } catch (err) {
        console.error('Error fetching profiles:', err);
      }
    };
    fetchProfiles();
  }, []);

  const addProfile = (newProfile) => {
    setProfiles((prev) => [...prev, newProfile]);
  };

  return { profiles, setProfiles, addProfile };
}
