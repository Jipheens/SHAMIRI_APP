import React, { createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (userInfo) => {
    await AsyncStorage.setItem('@user', JSON.stringify(userInfo));
    setUser(userInfo);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('@user');
    setUser(null);
  };

  React.useEffect(() => {
    const getUser = async () => {
      const userString = await AsyncStorage.getItem('@user');
      if (userString) {
        const user = JSON.parse(userString);
        setUser(user);
      }
    };

    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
