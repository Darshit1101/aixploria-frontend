import React, { useEffect, useState } from "react";
import { MdVerified } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import Swal from "sweetalert2";
import API_BASE_URL from "../utils/api";
import { api } from "axiosApi";

const CardList = () => {
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});
  const [previewImage, setPreviewImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const fetchCards = async () => {
    try {
      const res = await api.get(`/cards/getallcards`);
      setCards(res.data);
      setFilteredCards(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get(`/categories/getallcategories`);
      setCategories(res.data);
    } catch (err) {
      console.error("Failed to load categories:", err);
    }
  };

  const deleteCard = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/cards/delete-card/${id}`);
        const updatedCards = cards.filter((card) => card.id !== id);
        setCards(updatedCards);
        filterByCategory(selectedCategory, updatedCards);

        Swal.fire({
          title: "Deleted!",
          text: "The card has been successfully deleted.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (err) {
        console.error("Delete error:", err);
        Swal.fire("Error!", "Failed to delete the card.", "error");
      }
    }
  };

  const startEdit = (card) => {
    setEditId(card.id);
    setEditData({ ...card });
    const imageUrl =
      card.image.startsWith("http") || card.image.startsWith("https")
        ? card.image
        : `https://${card.image}`;
    setPreviewImage(imageUrl);
    fetchCategories();
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditData({});
    setPreviewImage(null);
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      const file = files[0];
      if (file) {
        setEditData((prev) => ({
          ...prev,
          imageFile: file,
        }));
        setPreviewImage(URL.createObjectURL(file));
      }
    } else {
      setEditData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const submitEdit = async () => {
    const result = await Swal.fire({
      title: "Save changes?",
      text: "Do you want to save the updated card?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Yes, save it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const formData = new FormData();
        Object.entries(editData).forEach(([key, value]) => {
          if (key === "imageFile") {
            formData.append("image", value);
          } else {
            formData.append(key, value);
          }
        });

        await api.put(`/cards/update-card/${editId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        await fetchCards();
        cancelEdit();

        Swal.fire({
          title: "Saved!",
          text: "The card has been updated.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (err) {
        console.error("Update error:", err);
        Swal.fire("Error!", "Failed to save changes.", "error");
      }
    }
  };

  const filterByCategory = (category, sourceCards = cards) => {
    setSelectedCategory(category);
    if (!category) {
      setFilteredCards(sourceCards);
    } else {
      setFilteredCards(
        sourceCards.filter((card) => card.category === category)
      );
    }
  };

  useEffect(() => {
    fetchCards();
    fetchCategories();
  }, []);

  return (
    <div className="px-4 py-8 mx-auto max-w-7xl font-[Poppins]">
      {/* Header: Title + Filter */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white p-4 sm:p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          📇 Card Fix
        </h2>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <label
            htmlFor="category-filter"
            className="text-sm sm:text-base font-medium"
          >
            Filter:
          </label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(e) => filterByCategory(e.target.value)}
            className="w-full sm:w-48 px-3 py-2 border rounded-lg bg-gray-700 text-white cursor-pointer text-sm sm:text-base focus:ring-2 focus:ring-gray-600 transition-all"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
        {filteredCards?.map((card) => (
          <div
            key={card.id}
            className="bg-white rounded-2xl p-4 border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <div className="relative">
              <img
                src={
                  editId === card.id
                    ? previewImage ||
                      (card.image.startsWith("http") ||
                      card.image.startsWith("https")
                        ? card.image
                        : `https://${card.image}`)
                    : card.image.startsWith("http") ||
                      card.image.startsWith("https")
                    ? card.image
                    : `https://${card.image}`
                }
                alt={card.name}
                className="w-full h-28 sm:h-32 md:h-36 object-cover rounded-xl mb-3"
                onError={(e) => {
                  e.target.style.display = "none";
                  console.error(
                    "Failed to load logo for card:",
                    card.id,
                    card.image
                  );
                }}
              />
              {(card.isVerified || card.isFeatured || card.isNew) && (
                <div className="absolute top-2 right-2 flex gap-1">
                  {card.isVerified && (
                    <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <MdVerified /> Verified
                    </span>
                  )}
                  {card.isFeatured && (
                    <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <FaStar /> Featured
                    </span>
                  )}
                  {card.isNew && (
                    <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                      New
                    </span>
                  )}
                </div>
              )}
            </div>

            {editId === card.id ? (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Upload Image
                  </label>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleEditChange}
                    className="mt-1 w-full text-sm text-gray-600 border-gray-300 rounded-lg"
                  />
                </div>
                <input
                  type="text"
                  name="name"
                  value={editData.name || ""}
                  onChange={handleEditChange}
                  placeholder="Name"
                  className="w-full px-3 py-2 border rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-gray-600"
                />
                <textarea
                  name="description"
                  value={editData.description || ""}
                  onChange={handleEditChange}
                  placeholder="Description"
                  className="w-full px-3 py-2 border rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-gray-600"
                  rows="3"
                />
                <input
                  type="text"
                  name="visitlink"
                  value={editData.visitlink || ""}
                  onChange={handleEditChange}
                  placeholder="Visit Link"
                  className="w-full px-3 py-2 border rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-gray-600"
                />
                <select
                  name="category"
                  value={editData.category || ""}
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 border rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-gray-600"
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
                  value={editData.premiumtype || ""}
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 border rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-gray-600"
                >
                  <option value="">Select Premium Type</option>
                  <option value="Free">Free</option>
                  <option value="Premium">Premium</option>
                  <option value="Exclusive">Exclusive</option>
                </select>

                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      name="isVerified"
                      checked={editData.isVerified || false}
                      onChange={handleEditChange}
                    />
                    Verified
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      name="isFeatured"
                      checked={editData.isFeatured || false}
                      onChange={handleEditChange}
                    />
                    Featured
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      name="isNew"
                      checked={editData.isNew || false}
                      onChange={handleEditChange}
                    />
                    New
                  </label>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={submitEdit}
                    className="w-full sm:w-auto bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all hover:scale-105"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="w-full sm:w-auto bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-all hover:scale-105"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                  {card.name}
                </h3>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Desc:</span>{" "}
                  {card.description}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Category:</span>{" "}
                  {card.category}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Premium:</span>{" "}
                  {card.premiumtype}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Views:</span> {card.views}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={() => startEdit(card)}
                    className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all hover:scale-105"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCard(card.id)}
                    className="w-full sm:w-auto bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all hover:scale-105"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardList;
