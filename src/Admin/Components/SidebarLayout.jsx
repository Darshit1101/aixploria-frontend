import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  FaSignOutAlt,
} from 'react-icons/fa';
import { TbCategoryPlus } from "react-icons/tb";
import { GiCardAceSpades } from "react-icons/gi";
import { SlSocialYoutube } from "react-icons/sl";
import { MdOutlineCategory } from "react-icons/md";
import { IoNewspaperOutline } from "react-icons/io5";
import { FaRocketchat } from "react-icons/fa";
import { HiMenuAlt3, HiX } from 'react-icons/hi';

const SidebarLayout = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const admin = JSON.parse(localStorage.getItem('admin'));

  if (!admin) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem('admin');
    navigate('/login');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const linkStyle = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-600 ${
      isActive ? 'bg-gradient-to-r from-gray-700 to-gray-600 text-white font-semibold' : 'text-gray-300'
    }`;

  return (
    <div className="min-h-screen flex font-[Poppins]">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6 flex flex-col transform transition-transform duration-300 ease-in-out shadow-xl ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:w-64 h-full overflow-y-auto`}
      >
        <div className="text-3xl font-extrabold mb-10 flex items-center justify-between tracking-tight">
          Admin Panel
          <button className="md:hidden text-white hover:text-gray-300 transition-colors" onClick={toggleSidebar}>
            <HiX size={28} />
          </button>
        </div>

        <nav className="space-y-1 flex-1">
          <NavLink to="/dashboard/users" className={linkStyle} onClick={() => setIsSidebarOpen(false)}>
            <TbCategoryPlus size={20} />
            Add Category
          </NavLink>
          <NavLink to="/dashboard/products" className={linkStyle} onClick={() => setIsSidebarOpen(false)}>
            <GiCardAceSpades size={20} />
            Add Cards
          </NavLink>
          <NavLink to="/dashboard/video-categories" className={linkStyle} onClick={() => setIsSidebarOpen(false)}>
            <MdOutlineCategory size={20} />
            Add V Category
          </NavLink>
          <NavLink to="/dashboard/aitutorial" className={linkStyle} onClick={() => setIsSidebarOpen(false)}>
            <SlSocialYoutube size={20} />
            Video Tutorial
          </NavLink>
          <NavLink to="/dashboard/add-news" className={linkStyle} onClick={() => setIsSidebarOpen(false)}>
            <IoNewspaperOutline size={20} />
            Add News
          </NavLink>
          <NavLink to="/dashboard/add-hub-spot" className={linkStyle} onClick={() => setIsSidebarOpen(false)}>
            <IoNewspaperOutline size={20} />
            Add Hubspot
          </NavLink>
          <NavLink to="/dashboard/add-gpt" className={linkStyle} onClick={() => setIsSidebarOpen(false)}>
            <FaRocketchat size={20} />
            Add GPT
          </NavLink>
          <NavLink to="/dashboard/blog" className={linkStyle} onClick={() => setIsSidebarOpen(false)}>
            <FaRocketchat size={20} />
            Add Blog
          </NavLink>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-8 w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-lg hover:scale-105"
        >
          <FaSignOutAlt size={18} />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* Mobile Header */}
        <header className="md:hidden bg-gradient-to-r from-gray-900 to-gray-800 text-white p-4 flex items-center justify-between shadow-md">
          <span className="text-xl font-bold tracking-tight">Admin Panel</span>
          <button className="hover:text-gray-300 transition-colors" onClick={toggleSidebar}>
            <HiMenuAlt3 size={28} />
          </button>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 bg-gray-100 p-4 sm:p-6 md:p-8">
          <Outlet />
        </main>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity duration-300"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default SidebarLayout;