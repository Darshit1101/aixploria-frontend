import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import API_BASE_URL from "../utils/api";
import CardList from "../Components/CardList";

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
  const [loadingLogo, setLoadingLogo] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/categories`);
      setCategories(res.data);
    } catch (err) {
      console.error("Failed to load categories");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setForm((prevForm) => {
      const updatedForm = {
        ...prevForm,
        [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
      };

      // If visitlink changes, attempt to fetch the logo
      if (name === "visitlink" && value) {
        fetchLogo(value);
      }

      return updatedForm;
    });
  };

  const fetchLogo = async (url) => {
    setLoadingLogo(true);
    try {
      // Construct the favicon URL (basic approach)
      const faviconUrl = `${url.includes("://") ? url.split("/")[2] : url}/favicon.ico`;
      const response = await axios.head(faviconUrl, { timeout: 5000 });

      if (response.status === 200) {
        setForm((prevForm) => ({
          ...prevForm,
          logoUrl: faviconUrl,
        }));
      } else {
        // Fallback: Try to fetch from a service like Google Favicon
        const googleFaviconUrl = `https://www.google.com/s2/favicons?domain=${url}`;
        setForm((prevForm) => ({
          ...prevForm,
          logoUrl: googleFaviconUrl,
        }));
      }
    } catch (error) {
      console.warn("Failed to fetch logo, using fallback:", error);
      // Fallback to Google Favicon API if direct fetch fails
      const googleFaviconUrl = `https://www.google.com/s2/favicons?domain=${url}`;
      setForm((prevForm) => ({
        ...prevForm,
        logoUrl: googleFaviconUrl,
      }));
    } finally {
      setLoadingLogo(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", form.name);
    // Use the uploaded image if available, otherwise use the fetched logoUrl as a string
    if (form.image) {
      formData.append("image", form.image);
    } else if (form.logoUrl) {
      formData.append("image", form.logoUrl); // Send logoUrl as a string
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
      await axios.post(`${API_BASE_URL}/api/cards/upload`, formData, {
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
        logoUrl: "", // Reset logo URL
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
    <>
      <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
        Add Cards
      </h1>
      <div className="max-w-7xl mt-10 rounded font-[Poppins]">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Card Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            required
          />

          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            // Optional: Remove required if you want to rely on auto-fetched logo
          />
          {form.visitlink && form.logoUrl && (
            <div className="mt-2">
              <p>Preview Auto-Fetched Logo:</p>
              <img
                src={form.logoUrl}
                alt="Logo Preview"
                className="w-16 h-16 object-cover rounded"
                onError={(e) => {
                  e.target.style.display = "none"; // Hide image on error
                  console.error("Failed to load logo:", form.logoUrl);
                }}
              />
            </div>
          )}
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            rows="3"
            required
          />
          <input
            name="visitlink"
            placeholder="Visit Link"
            value={form.visitlink}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            required
          />
          <input
            name="views"
            type="number"
            placeholder="Views"
            value={form.views}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="isVerified"
                checked={form.isVerified}
                onChange={handleChange}
              />
              <span>Verified</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="isFeatured"
                checked={form.isFeatured}
                onChange={handleChange}
              />
              <span>Featured</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="isNew"
                checked={form.isNew}
                onChange={handleChange}
              />
              <span>New</span>
            </label>
          </div>

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
          <select
            name="premiumtype"
            value={form.premiumtype}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          >
            <option value="">Select Premium Type</option>
            <option value="Free">Free</option>
            <option value="Premium">Premium</option>
          </select>
          <button
            type="submit"
            className="w-[20%] cursor-pointer bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Add Card
          </button>
        </form>

        <div className="flex mt-6">
          <CardList />
        </div>
      </div>
    </>
  );
};

export default AddCard;