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
