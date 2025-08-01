import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Public Pages
import HomePage from "./Pages/HomePage";
import Submit from "./Pages/Submit";
import AIList from "./Component/AIList";
import FulllistPage from "./Pages/FulllistPage";
import AICategory from "./Pages/AICategory";
import AiTutorialsPage from "./Pages/AiTutorialsPage";
import NewAiPage from "./Pages/NewAiPage";
import FreeAITools from "./Pages/FreeAITools";
import AiNewsHome from "./Pages/AINews";
import BonusAndExtra from "./Pages/BonusAndExtra";
import NotFound from "./Pages/404";
import VideoSearchResult from "./Pages/VideoSearchResult";
// Shared Components
import Navbar from "./Component/Navbar";
import Footer from "./Component/Footer";

// Admin Pages
import LoginPage from "./Admin/Pages/LoginPage";
import Dashboard from "./Admin/Pages/Dashboard";
import Users from "./Admin/Pages/AddCategory";
import AddCards from "./Admin/Pages/AddCards";
import Orders from "./Admin/Pages/Orders";
import Settings from "./Admin/Pages/Settings";

// Admin Utilities
import ProtectedRoute from "./Admin/Components/ProtectedRoute";
import SidebarLayout from "./Admin/Components/SidebarLayout";
import CategoryPage from "./Pages/CategoryPage";
import SearchResults from "./Pages/SearchResults";
import PremiumResults from "./Pages/PremiumResults";
import AddAiTutorial from "./Admin/Pages/AddAiTutorial";
import AddVideoCategory from "./Admin/Pages/AddVideoCategory";
import NewsManager from "./Admin/Pages/NewsManager";
// Public layout wrapper
import HubSpot from "./BonusExtra/HubSpot";
import AddHubspot from "./Admin/Pages/AddHubSpot";
import AddGPTCategory from "./Admin/Components/AddGPTCategory";
import GptGallery from "./BonusExtra/GptGallery";
import BlogManager from "./Admin/Pages/Blog";
import BlogList from "./BonusExtra/BlogList";
import BlogDetail from "./BonusExtra/BlogDetail";
import AllAITools from "./Component/AllAITools";
import Top100AI from "./Component/Top100AI";

const PublicLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* ✅ Public Routes */}
        <Route
          path="/"
          element={
            <PublicLayout>
              <HomePage />
            </PublicLayout>
          }
        />
        <Route
          path="/submit"
          element={
            <PublicLayout>
              <Submit />
            </PublicLayout>
          }
        />
        <Route
          path="/ailist"
          element={
            <PublicLayout>
              <AIList />
            </PublicLayout>
          }
        />
        <Route
          path="/fulllist"
          element={
            <PublicLayout>
              <FulllistPage />
            </PublicLayout>
          }
        />
        <Route
          path="/aicategory"
          element={
            <PublicLayout>
              <AICategory />
            </PublicLayout>
          }
        />
        <Route
          path="/aitutorials"
          element={
            <PublicLayout>
              <AiTutorialsPage />
            </PublicLayout>
          }
        />
        <Route
          path="/newai"
          element={
            <PublicLayout>
              <NewAiPage />
            </PublicLayout>
          }
        />
        <Route
          path="/freeaitool"
          element={
            <PublicLayout>
              <FreeAITools />
            </PublicLayout>
          }
        />
        <Route
          path="/ainews"
          element={
            <PublicLayout>
              <AiNewsHome />
            </PublicLayout>
          }
        />
        <Route
          path="/bonus&extras"
          element={
            <PublicLayout>
              <BonusAndExtra />
            </PublicLayout>
          }
        />
        <Route
          path="/category/:categoryName"
          element={
            <PublicLayout>
              <CategoryPage />
            </PublicLayout>
          }
        />
        <Route
          path="/premium/:type"
          element={
            <PublicLayout>
              <PremiumResults />
            </PublicLayout>
          }
        />
        <Route
          path="/search"
          element={
            <PublicLayout>
              <SearchResults />
            </PublicLayout>
          }
        />
        <Route
          path="/video-search"
          element={
            <PublicLayout>
              <VideoSearchResult />
            </PublicLayout>
          }
        />
        {/* Bonus Routes */}
        <Route
          path="/hub-spot-ai"
          element={
            <PublicLayout>
              <HubSpot />
            </PublicLayout>
          }
        />
        <Route
          path="/gpt-list"
          element={
            <PublicLayout>
              <GptGallery />
            </PublicLayout>
          }
        />
        <Route
          path="/blogs"
          element={
            <PublicLayout>
              <BlogList />
            </PublicLayout>
          }
        />
        <Route
          path="/all-ai-tools"
          element={
            <PublicLayout>
              <AllAITools />
            </PublicLayout>
          }
        />
        <Route
          path="/top-100-ai"
          element={
            <PublicLayout>
              <Top100AI />
            </PublicLayout>
          }
        />

        {/* <Route path="/" element={<BlogList />} /> */}
        <Route path="/blogs/:id" element={<BlogDetail />} />

        {/* ✅ Admin Login */}
        <Route path="/login" element={<LoginPage />} />

        {/* ✅ Admin Routes with Sidebar */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <SidebarLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="products" element={<AddCards />} />
          <Route path="orders" element={<Orders />} />
          <Route path="settings" element={<Settings />} />
          <Route path="aitutorial" element={<AddAiTutorial />} />
          <Route path="video-categories" element={<AddVideoCategory />} />
          <Route path="add-news" element={<NewsManager />} />
          <Route path="add-hub-spot" element={<AddHubspot />} />
          <Route path="add-gpt" element={<AddGPTCategory />} />
          <Route path="blog" element={<BlogManager />} />
        </Route>

        {/* ✅ 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";

// // Public Pages
// import HomePage from "./Pages/HomePage";
// import Submit from "./Pages/Submit";
// import AIList from "./Component/AIList";
// import FulllistPage from "./Pages/FulllistPage";
// import AICategory from "./Pages/AICategory";
// import AiTutorialsPage from "./Pages/AiTutorialsPage";
// import NewAiPage from "./Pages/NewAiPage";
// import FreeAITools from "./Pages/FreeAITools";
// import AiNewsHome from "./Pages/AINews";
// import BonusAndExtra from "./Pages/BonusAndExtra";
// import NotFound from "./Pages/404";
// import VideoSearchResult from "./Pages/VideoSearchResult";
// import CategoryPage from "./Pages/CategoryPage";
// import SearchResults from "./Pages/SearchResults";
// import PremiumResults from "./Pages/PremiumResults";
// import HubSpot from "./BonusExtra/HubSpot";
// import GptGallery from "./BonusExtra/GptGallery";
// import BlogList from "./BonusExtra/BlogList";
// import BlogDetail from "./BonusExtra/BlogDetail";
// import AllAITools from "./Component/AllAITools";
// import Top100AI from "./Component/Top100AI";

// // Shared Components
// import Navbar from "./Component/Navbar";
// import Footer from "./Component/Footer";

// // Admin Pages
// import LoginPage from "./Admin/Pages/LoginPage";
// import Dashboard from "./Admin/Pages/Dashboard";
// import Users from "./Admin/Pages/AddCategory";
// import AddCards from "./Admin/Pages/AddCards";
// import Orders from "./Admin/Pages/Orders";
// import Settings from "./Admin/Pages/Settings";
// import AddAiTutorial from "./Admin/Pages/AddAiTutorial";
// import AddVideoCategory from "./Admin/Pages/AddVideoCategory";
// import NewsManager from "./Admin/Pages/NewsManager";
// import AddHubspot from "./Admin/Pages/AddHubSpot";
// import AddGPTCategory from "./Admin/Components/AddGPTCategory";
// import BlogManager from "./Admin/Pages/Blog";

// // Admin Utilities
// import ProtectedRoute from "./Admin/Components/ProtectedRoute";
// import SidebarLayout from "./Admin/Components/SidebarLayout";

// // Layout wrapper for public routes
// const PublicLayout = ({ children }) => (
//   <div className="flex flex-col min-h-screen">
//     <Navbar />
//     <main className="flex-grow">{children}</main>
//     <Footer />
//   </div>
// );

// // Define public routes configuration
// const publicRoutes = [
//   { path: "/", element: <HomePage /> },
//   { path: "/submit", element: <Submit /> },
//   { path: "/ailist", element: <AIList /> },
//   { path: "/fulllist", element: <FulllistPage /> },
//   { path: "/aicategory", element: <AICategory /> },
//   { path: "/aitutorials", element: <AiTutorialsPage /> },
//   { path: "/newai", element: <NewAiPage /> },
//   { path: "/freeaitool", element: <FreeAITools /> },
//   { path: "/ainews", element: <AiNewsHome /> },
//   { path: "/bonus&extras", element: <BonusAndExtra /> },
//   { path: "/category/:categoryName", element: <CategoryPage /> },
//   { path: "/premium/:type", element: <PremiumResults /> },
//   { path: "/search", element: <SearchResults /> },
//   { path: "/video-search", element: <VideoSearchResult /> },
//   { path: "/hub-spot-ai", element: <HubSpot /> },
//   { path: "/gpt-list", element: <GptGallery /> },
//   { path: "/blogs", element: <BlogList /> },
//   { path: "/blogs/:id", element: <BlogDetail /> },
//   { path: "/all-ai-tools", element: <AllAITools /> },
//   { path: "/top-100-ai", element: <Top100AI /> },
// ];

// // Define admin routes configuration
// const adminRoutes = [
//   { path: "", element: <Dashboard /> },
//   { path: "users", element: <Users /> },
//   { path: "products", element: <AddCards /> },
//   { path: "orders", element: <Orders /> },
//   { path: "settings", element: <Settings /> },
//   { path: "aitutorial", element: <AddAiTutorial /> },
//   { path: "video-categories", element: <AddVideoCategory /> },
//   { path: "add-news", element: <NewsManager /> },
//   { path: "add-hub-spot", element: <AddHubspot /> },
//   { path: "add-gpt", element: <AddGPTCategory /> },
//   { path: "blog", element: <BlogManager /> },
// ];

// const App = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Public Routes */}
//         <Route element={<PublicLayout />}>
//           {publicRoutes.map(({ path, element }) => (
//             <Route key={path} path={path} element={element} />
//           ))}
//         </Route>

//         {/* Admin Login Route */}
//         <Route path="/login" element={<LoginPage />} />

//         {/* Admin Routes with Sidebar */}
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <SidebarLayout />
//             </ProtectedRoute>
//           }
//         >
//           {adminRoutes.map(({ path, element }) => (
//             <Route key={path} path={path} element={element} />
//           ))}
//         </Route>

//         {/* 404 Catch-All Route */}
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;
