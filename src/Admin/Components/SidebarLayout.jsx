import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  FaCog,
  FaSignOutAlt,
} from 'react-icons/fa';
import { RiDashboardLine } from 'react-icons/ri';
import { TbCategoryPlus } from "react-icons/tb";
import { GiCardAceSpades } from "react-icons/gi";
import { SlSocialYoutube } from "react-icons/sl";
import { MdOutlineCategory } from "react-icons/md";
import { IoNewspaperOutline } from "react-icons/io5";
import { FaRocketchat } from "react-icons/fa";
const SidebarLayout = () => {
  const navigate = useNavigate();
  const admin = JSON.parse(localStorage.getItem('admin'));

  if (!admin) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem('admin');
    navigate('/login');
  };

  const linkStyle = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-700 ${isActive ? 'bg-gray-700 text-white font-semibold' : ''
    }`;

  return (
    <div className="min-h-screen flex font-[Poppins]">
      <aside className="w-64 bg-gray-900 text-white p-6 flex flex-col">
        <div className="text-2xl font-bold mb-10">Admin Panel</div>

        <nav className="space-y-2 flex-1">
          {/* <NavLink to="/dashboard" end className={linkStyle}>
            <RiDashboardLine />
            Dashboard
          </NavLink> */}
          <NavLink to="/dashboard/users" className={linkStyle}>
            <TbCategoryPlus />
            Add Category
          </NavLink>
          <NavLink to="/dashboard/products" className={linkStyle}>
            <GiCardAceSpades />
            Add Cards
          </NavLink>
          <NavLink to="/dashboard/video-categories" className={linkStyle}>
            <MdOutlineCategory />
            Add V Category
          </NavLink>
          <NavLink to="/dashboard/aitutorial" className={linkStyle}>
            <SlSocialYoutube />
            Video Tuturial
          </NavLink>
          <NavLink to="/dashboard/add-news" className={linkStyle}>
            <IoNewspaperOutline /> Add News
          </NavLink>
          <NavLink to="/dashboard/add-hub-spot" className={linkStyle}>
            <IoNewspaperOutline /> Add Hubspot
          </NavLink>
          <NavLink to="/dashboard/add-gpt" className={linkStyle}>
             <FaRocketchat/> Add GPT
          </NavLink>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-6 w-full bg-red-600 hover:bg-red-700 py-2 rounded flex items-center justify-center gap-2"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </aside>

      <main className="flex-1 bg-gray-100 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default SidebarLayout;
