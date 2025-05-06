const authService = {
    login: async ({ username, password }) => {
      await new Promise((res) => setTimeout(res, 300));
  
      const token = 'fake-jwt-token';
      const user = { username };
  
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
  
      return { data: { user, token } };
    },
  
    logout: async () => {
      await new Promise((res) => setTimeout(res, 100));
  
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  
    getCurrentUser: () => {
      const raw = localStorage.getItem('user');
      return raw ? JSON.parse(raw) : null;
    },
  };
  
  export default authService;
  