/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import API_BASE_URL from "../utils/api";
import CardList from "../Components/CardList";
import { api } from "axiosApi";

const AddCard = () => {
  const [form, setForm] = useState({
    name: "",
    image: null,
    description: "",
    isVerified: false,
    isFeatured: false,
    isNew: false,
    views: 0,
    visitlink: "",
    category: "",
    premiumtype: "",
    logoUrl: "",
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await api.get(`/categories/getallcategories`);
      setCategories(res.data);
    } catch (err) {
      console.error("Failed to load categories");
      Swal.fire("Error", "Failed to fetch categories.", "error");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setForm((prevForm) => {
      const updatedForm = {
        ...prevForm,
        [name]:
          type === "checkbox" ? checked : type === "file" ? files[0] : value,
      };

      if (name === "visitlink" && value) {
        fetchLogo(value);
      }

      return updatedForm;
    });
  };

  const fetchLogo = async (url) => {
    try {
      const faviconUrl = `${
        url.includes("://") ? url.split("/")[2] : url
      }/favicon.ico`;
      const response = await axios.head(faviconUrl, { timeout: 5000 });

      if (response.status === 200) {
        setForm((prevForm) => ({
          ...prevForm,
          logoUrl: faviconUrl,
        }));
      } else {
        const googleFaviconUrl = `https://www.google.com/s2/favicons?domain=${url}`;
        setForm((prevForm) => ({
          ...prevForm,
          logoUrl: googleFaviconUrl,
        }));
      }
    } catch (error) {
      console.warn("Failed to fetch logo, using fallback:", error);
      const googleFaviconUrl = `https://www.google.com/s2/favicons?domain=${url}`;
      setForm((prevForm) => ({
        ...prevForm,
        logoUrl: googleFaviconUrl,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", form.name);
    if (form.image) {
      formData.append("image", form.image);
    } else if (form.logoUrl) {
      formData.append("image", form.logoUrl);
    }
    formData.append("description", form.description);
    formData.append("isVerified", form.isVerified);
    formData.append("isFeatured", form.isFeatured);
    formData.append("isNew", form.isNew);
    formData.append("views", form.views);
    formData.append("visitlink", form.visitlink);
    formData.append("category", form.category);
    formData.append("premiumtype", form.premiumtype);

    try {
      await api.post(`/cards/add-card`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      Swal.fire("Success", "Card added successfully!", "success");
      setForm({
        name: "",
        image: null,
        description: "",
        isVerified: false,
        isFeatured: false,
        isNew: false,
        views: 0,
        visitlink: "",
        category: "",
        premiumtype: "",
        logoUrl: "",
      });
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.message || "Something went wrong",
        "error"
      );
    }
  };

  return (
    <div className="font-[Poppins] px-4 py-8 mx-auto max-w-7xl">
      {/* Header */}
      <div className="mb-6 bg-gradient-to-r from-gray-900 to-gray-800 text-white p-4 sm:p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Add Card
        </h1>
      </div>

      {/* Add Card Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl p-4 sm:p-6 rounded-2xl mb-8"
      >
        <div className="space-y-4">
          <div>
            <input
              name="name"
              placeholder="Card Name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm sm:text-base bg-gray-50 focus:ring-2 focus:ring-gray-600 transition-all"
              required
            />
          </div>
          <div>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm sm:text-base bg-gray-50 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 transition-all"
            />
            {form.visitlink && form.logoUrl && (
              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  Preview Auto-Fetched Logo:
                </p>
                <img
                  src={form.logoUrl}
                  alt="Logo Preview"
                  className="w-16 h-16 object-cover rounded-lg mt-2"
                  onError={(e) => {
                    e.target.style.display = "none";
                    console.error("Failed to load logo:", form.logoUrl);
                  }}
                />
              </div>
            )}
          </div>
          <div>
            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm sm:text-base bg-gray-50 focus:ring-2 focus:ring-gray-600 transition-all"
              rows="4"
              required
            />
          </div>
          <div>
            <input
              name="visitlink"
              placeholder="Visit Link"
              value={form.visitlink}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm sm:text-base bg-gray-50 focus:ring-2 focus:ring-gray-600 transition-all"
              required
            />
          </div>
          <div>
            <input
              name="views"
              type="number"
              placeholder="Views"
              value={form.views}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm sm:text-base bg-gray-50 focus:ring-2 focus:ring-gray-600 transition-all"
            />
          </div>
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="isVerified"
                checked={form.isVerified}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Verified</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="isFeatured"
                checked={form.isFeatured}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Featured</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="isNew"
                checked={form.isNew}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">New</span>
            </label>
          </div>
          <div>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm sm:text-base bg-gray-50 focus:ring-2 focus:ring-gray-600 transition-all"
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select
              name="premiumtype"
              value={form.premiumtype}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm sm:text-base bg-gray-50 focus:ring-2 focus:ring-gray-600 transition-all"
            >
              <option value="">Select Premium Type</option>
              <option value="Free">Free</option>
              <option value="Premium">Premium</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 hover:scale-105 shadow-md"
          >
            Add Card
          </button>
        </div>
      </form>

      {/* Card List */}
      <div className="bg-white shadow-xl p-4 sm:p-6 rounded-2xl">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
          Card List
        </h2>
        <CardList />
      </div>
    </div>
  );
};

export default AddCard;
