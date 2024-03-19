import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (userData) => {
    try {
      // Example: Make a POST request to backend to authenticate user
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        const user = await response.json();
        setUser(user);
        // Store user data in localStorage or sessionStorage if needed
        localStorage.setItem('user', JSON.stringify(user));
        return true; // Authentication successful
      } else {
        // Handle authentication failure (e.g., display error message)
        console.error('Authentication failed:', response.statusText);
        return false;
      }
    } catch (error) {
      console.error('Error logging in:', error);
      return false;
    }
  };

  const logout = () => {
    // Clear user data from state and localStorage
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
