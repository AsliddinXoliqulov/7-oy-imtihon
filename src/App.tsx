import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

import Login from './pages/Login';
import Asosiy from './pages/Asosiy';
import Managerlar from './pages/Managerlar';
import Adminlar from './pages/Adminlar';
import Ustozlar from './pages/Ustozlar';
import Studentlar from './pages/Studentlar';
import Guruhlar from './pages/Guruhlar';
import Kurslar from './pages/Kurslar';
import Payment from './pages/Payment';
import Sozlamalar from './pages/Sozlamalar';
import Profile from './pages/Profile';
// import Logout from './pages/Logout';

import Layout from './components/Layout/Layout';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/sozlamalar" element={<Sozlamalar />} />

      <Route element={<PrivateRoute><Layout /></PrivateRoute>}>
        <Route path="/asosiy" element={<Asosiy />} />
        <Route path="/managerlar" element={<Managerlar />} />
        <Route path="/adminlar" element={<Adminlar />} />
        <Route path="/ustozlar" element={<Ustozlar />} />
        <Route path="/studentlar" element={<Studentlar />} />
        <Route path="/guruhlar" element={<Guruhlar />} />
        <Route path="/kurslar" element={<Kurslar />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/sozlamalar" element={<Sozlamalar />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route path="*" element={<Navigate to="/asosiy" />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
