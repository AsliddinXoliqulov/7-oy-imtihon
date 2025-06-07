import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Layout/Sidebar'; // sidebar component
// import Header from '../components/Layout/Header';   // agar kerak bo‘lsa, bo‘lmasa olib tashlang
import './Layout.css'; // optional: stil uchun

export default function Layout() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        {/* Optional: <Header /> */}
        <Outlet />
      </div>
    </div>
  );
}
