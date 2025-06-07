import { createContext, useContext, useState } from 'react';
type UserType = {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  image?: string;
  role: string;
  work_date: string;
  work_end: string | null;
  active: boolean;
  status: string;
  is_deleted: boolean;
  leave_history: any[];
  createdAt: string;
  updatedAt: string;
  token: string;
};

type AuthContextType = {
  token: string | null;
  user: UserType | null;
  login: (data: UserType) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // localStorage dan user olish
  const storedUser = localStorage.getItem('user');
  const initialUser: UserType | null = storedUser ? JSON.parse(storedUser) : null;

  const [user, setUser] = useState<UserType | null>(initialUser);

  const token = user?.token || null;

  const login = (data: UserType) => {
    localStorage.setItem('user', JSON.stringify(data));
    setUser(data);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
