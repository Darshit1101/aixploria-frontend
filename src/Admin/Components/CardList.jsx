// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { MdVerified } from "react-icons/md";
// import { FaStar } from "react-icons/fa";
// import Swal from "sweetalert2";
// import API_BASE_URL from "../utils/api";

// const CardList = () => {
//   const [cards, setCards] = useState([]);
//   const [filteredCards, setFilteredCards] = useState([]);
//   const [editId, setEditId] = useState(null);
//   const [editData, setEditData] = useState({});
//   const [previewImage, setPreviewImage] = useState(null);
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("");

//   const fetchCards = async () => {
//     try {
//       const res = await axios.get(`${API_BASE_URL}/api/cards`);
//       setCards(res.data);
//       console.log(res.data, "res");

//       setFilteredCards(res.data);
//     } catch (err) {
//       console.error("Fetch error:", err);
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get(`${API_BASE_URL}/api/categories`);
//       setCategories(res.data);
//     } catch (err) {
//       console.error("Failed to load categories:", err);
//     }
//   };

//   const deleteCard = async (id) => {
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//       cancelButtonText: "Cancel",
//     });

//     if (result.isConfirmed) {
//       try {
//         await axios.delete(`${API_BASE_URL}/api/cards/${id}`);
//         const updatedCards = cards.filter((card) => card.id !== id);
//         setCards(updatedCards);
//         filterByCategory(selectedCategory, updatedCards);

//         Swal.fire({
//           title: "Deleted!",
//           text: "The card has been successfully deleted.",
//           icon: "success",
//           timer: 1500,
//           showConfirmButton: false,
//         });
//       } catch (err) {
//         console.error("Delete error:", err);
//         Swal.fire("Error!", "Failed to delete the card.", "error");
//       }
//     }
//   };

//   const startEdit = (card) => {
//     setEditId(card.id);
//     setEditData({ ...card });
//     setPreviewImage(`${API_BASE_URL}${card.image}`);
//     fetchCategories();
//   };

//   const cancelEdit = () => {
//     setEditId(null);
//     setEditData({});
//     setPreviewImage(null);
//   };

//   const handleEditChange = (e) => {
//     const { name, value, type, checked, files } = e.target;
//     if (type === "file") {
//       const file = files[0];
//       if (file) {
//         setEditData((prev) => ({
//           ...prev,
//           imageFile: file,
//         }));
//         setPreviewImage(URL.createObjectURL(file));
//       }
//     } else {
//       setEditData((prev) => ({
//         ...prev,
//         [name]: type === "checkbox" ? checked : value,
//       }));
//     }
//   };

//   const submitEdit = async () => {
//     const result = await Swal.fire({
//       title: "Save changes?",
//       text: "Do you want to save the updated card?",
//       icon: "question",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#aaa",
//       confirmButtonText: "Yes, save it!",
//       cancelButtonText: "Cancel",
//     });

//     if (result.isConfirmed) {
//       try {
//         const formData = new FormData();
//         Object.entries(editData).forEach(([key, value]) => {
//           if (key === "imageFile") {
//             formData.append("image", value);
//           } else {
//             formData.append(key, value);
//           }
//         });

//         await axios.put(`${API_BASE_URL}/api/cards/${editId}`, formData, {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         });

//         await fetchCards();
//         cancelEdit();

//         Swal.fire({
//           title: "Saved!",
//           text: "The card has been updated.",
//           icon: "success",
//           timer: 1500,
//           showConfirmButton: false,
//         });
//       } catch (err) {
//         console.error("Update error:", err);
//         Swal.fire("Error!", "Failed to save changes.", "error");
//       }
//     }
//   };

//   const filterByCategory = (category, sourceCards = cards) => {
//     setSelectedCategory(category);
//     if (!category) {
//       setFilteredCards(sourceCards);
//     } else {
//       setFilteredCards(
//         sourceCards.filter((card) => card.category === category)
//       );
//     }
//   };

//   useEffect(() => {
//     fetchCards();
//     fetchCategories();
//   }, []);

//   return (
//     <div className="px-4 py-8">
//       {/* Header: Title + Filter */}
//       <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//         <h2 className="text-2xl font-bold">📇 Card Fix</h2>
//         <div className="flex items-center gap-2">
//           <label htmlFor="category-filter" className="text-sm font-medium">
//             Filter:
//           </label>
//           <select
//             id="category-filter"
//             value={selectedCategory}
//             onChange={(e) => filterByCategory(e.target.value)}
//             className="px-4 py-2 border rounded-lg bg-black text-white cursor-pointer"
//           >
//             <option value="">All Categories</option>
//             {categories.map((cat) => (
//               <option key={cat.id} value={cat.name}>
//                 {cat.name}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Card Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
//         {filteredCards?.map((card) => (
//           <div
//             key={card.id}
//             className="bg-white rounded-2xl p-6 border border-gray-100 transition hover:shadow-lg"
//           >
//             {console.log(card.image, "image")}
//             {/* <img
//               src={
//                 editId === card.id
//                   ? previewImage || `${API_BASE_URL}/${card.image}`
//                   : `${API_BASE_URL}/${card.image}`
//               }
//               alt={card.name}
//               className="w-full h-32 object-cover rounded-xl mb-4"
//             /> */}
//             <img
//               src={card.image}
//               alt={card.name}
//               className="w-full h-32 object-cover rounded-xl mb-4"
//             />

//             {editId === card.id ? (
//               <>
//                 <label htmlFor="">Upload Image</label>
//                 <input
//                   type="file"
//                   name="image"
//                   accept="image/*"
//                   onChange={handleEditChange}
//                   className="mb-2 w-full text-sm"
//                 />
//                 <input
//                   type="text"
//                   name="name"
//                   value={editData.name || ""}
//                   onChange={handleEditChange}
//                   placeholder="Name"
//                   className="w-full mb-2 px-3 py-2 border rounded-lg"
//                 />
//                 <textarea
//                   name="description"
//                   value={editData.description || ""}
//                   onChange={handleEditChange}
//                   placeholder="Description"
//                   className="w-full mb-2 px-3 py-2 border rounded-lg"
//                 />
//                 <input
//                   type="text"
//                   name="visitlink"
//                   value={editData.visitlink || ""}
//                   onChange={handleEditChange}
//                   placeholder="Visit Link"
//                   className="w-full mb-2 px-3 py-2 border rounded-lg"
//                 />
//                 <select
//                   name="category"
//                   value={editData.category || ""}
//                   onChange={handleEditChange}
//                   className="w-full mb-2 px-3 py-2 border rounded-lg"
//                 >
//                   <option value="">Select Category</option>
//                   {categories.map((cat) => (
//                     <option key={cat.id} value={cat.name}>
//                       {cat.name}
//                     </option>
//                   ))}
//                 </select>
//                 <select
//                   name="premiumtype"
//                   value={editData.premiumtype || ""}
//                   onChange={handleEditChange}
//                   className="w-full mb-2 px-3 py-2 border rounded-lg"
//                 >
//                   <option value="">Select Premium Type</option>
//                   <option value="Free">Free</option>
//                   <option value="Premium">Premium</option>
//                   <option value="Exclusive">Exclusive</option>
//                 </select>

//                 <div className="flex items-center gap-4 mb-4">
//                   <label className="flex items-center gap-2">
//                     <input
//                       type="checkbox"
//                       name="isVerified"
//                       checked={editData.isVerified || false}
//                       onChange={handleEditChange}
//                     />
//                     <span className="text-sm">Verified</span>
//                   </label>
//                   <label className="flex items-center gap-2">
//                     <input
//                       type="checkbox"
//                       name="isFeatured"
//                       checked={editData.isFeatured || false}
//                       onChange={handleEditChange}
//                     />
//                     <span className="text-sm">Featured</span>
//                   </label>
//                   <label className="flex items-center gap-2">
//                     <input
//                       type="checkbox"
//                       name="isNew"
//                       checked={editData.isNew || false}
//                       onChange={handleEditChange}
//                     />
//                     <span className="text-sm">New</span>
//                   </label>
//                 </div>

//                 <div className="flex gap-3">
//                   <button
//                     onClick={submitEdit}
//                     className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
//                   >
//                     Save
//                   </button>
//                   <button
//                     onClick={cancelEdit}
//                     className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <>
//                 <h3 className="text-lg font-bold">{card.name}</h3>
//                 <p className="mb-1 text-sm">
//                   Desc:{" "}
//                   <span className="font-semibold">{card.description}</span>
//                 </p>
//                 <p className="text-sm">
//                   Category: <span className="font-medium">{card.category}</span>
//                 </p>
//                 <p className="text-sm">
//                   Premium:{" "}
//                   <span className="font-medium">{card.premiumtype}</span>
//                 </p>
//                 <p className="text-sm flex items-center gap-4">
//                   {card.isVerified && (
//                     <span className="flex items-center text-green-600 gap-1">
//                       <MdVerified /> Verified
//                     </span>
//                   )}
//                   {card.isFeatured && (
//                     <span className="flex items-center text-yellow-500 gap-1">
//                       <FaStar /> Featured
//                     </span>
//                   )}
//                 </p>
//                 <p className="text-sm mb-3">
//                   Views: <span className="font-bold">{card.views}</span>
//                 </p>
//                 <div className="flex gap-3">
//                   <button
//                     onClick={() => startEdit(card)}
//                     className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => deleteCard(card.id)}
//                     className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CardList;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdVerified } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import Swal from "sweetalert2";
import API_BASE_URL from "../utils/api";

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
      const res = await axios.get(`${API_BASE_URL}/api/cards`);
      setCards(res.data);
      console.log(res.data, "res");
      setFilteredCards(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/categories`);
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
        await axios.delete(`${API_BASE_URL}/api/cards/${id}`);
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
    // Construct full URL for preview
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

        await axios.put(`${API_BASE_URL}/api/cards/${editId}`, formData, {
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
    <div className="px-4 py-8 mx-auto max-w-7xl">
      {/* Header: Title + Filter */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold">📇 Card Fix</h2>
        <div className="flex items-center gap-2 w-full md:w-auto">
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
            className="w-full md:w-48 px-3 py-2 border rounded-lg bg-black text-white cursor-pointer text-sm sm:text-base"
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
            className="bg-white rounded-2xl p-3 sm:p-4 border border-gray-100 transition hover:shadow-lg"
          >
            {console.log(card.image, "image")}
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
              className="w-full h-24 sm:h-28 md:h-32 object-cover rounded-xl mb-2 sm:mb-3"
              onError={(e) => {
                e.target.style.display = "none"; // Hide image on error
                console.error(
                  "Failed to load logo for card:",
                  card.id,
                  card.image
                );
              }}
            />

            {editId === card.id ? (
              <>
                <label htmlFor="" className="block text-sm sm:text-base">
                  Upload Image
                </label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleEditChange}
                  className="mb-2 w-full text-sm sm:text-base"
                />
                <input
                  type="text"
                  name="name"
                  value={editData.name || ""}
                  onChange={handleEditChange}
                  placeholder="Name"
                  className="w-full mb-2 px-2 sm:px-3 py-1 sm:py-2 border rounded-lg text-sm sm:text-base"
                />
                <textarea
                  name="description"
                  value={editData.description || ""}
                  onChange={handleEditChange}
                  placeholder="Description"
                  className="w-full mb-2 px-2 sm:px-3 py-1 sm:py-2 border rounded-lg text-sm sm:text-base"
                  rows="2"
                />
                <input
                  type="text"
                  name="visitlink"
                  value={editData.visitlink || ""}
                  onChange={handleEditChange}
                  placeholder="Visit Link"
                  className="w-full mb-2 px-2 sm:px-3 py-1 sm:py-2 border rounded-lg text-sm sm:text-base"
                />
                <select
                  name="category"
                  value={editData.category || ""}
                  onChange={handleEditChange}
                  className="w-full mb-2 px-2 sm:px-3 py-1 sm:py-2 border rounded-lg text-sm sm:text-base"
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
                  className="w-full mb-2 px-2 sm:px-3 py-1 sm:py-2 border rounded-lg text-sm sm:text-base"
                >
                  <option value="">Select Premium Type</option>
                  <option value="Free">Free</option>
                  <option value="Premium">Premium</option>
                  <option value="Exclusive">Exclusive</option>
                </select>

                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mb-2 sm:mb-3">
                  <label className="flex items-center gap-1 sm:gap-2">
                    <input
                      type="checkbox"
                      name="isVerified"
                      checked={editData.isVerified || false}
                      onChange={handleEditChange}
                      className="text-sm sm:text-base"
                    />
                    <span className="text-xs sm:text-sm">Verified</span>
                  </label>
                  <label className="flex items-center gap-1 sm:gap-2">
                    <input
                      type="checkbox"
                      name="isFeatured"
                      checked={editData.isFeatured || false}
                      onChange={handleEditChange}
                      className="text-sm sm:text-base"
                    />
                    <span className="text-xs sm:text-sm">Featured</span>
                  </label>
                  <label className="flex items-center gap-1 sm:gap-2">
                    <input
                      type="checkbox"
                      name="isNew"
                      checked={editData.isNew || false}
                      onChange={handleEditChange}
                      className="text-sm sm:text-base"
                    />
                    <span className="text-xs sm:text-sm">New</span>
                  </label>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <button
                    onClick={submitEdit}
                    className="w-full sm:w-auto bg-green-500 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-lg hover:bg-green-600 text-sm sm:text-base"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="w-full sm:w-auto bg-gray-400 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-lg hover:bg-gray-500 text-sm sm:text-base"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">
                  {card.name}
                </h3>
                <p className="mb-1 text-sm sm:text-base">
                  Desc:{" "}
                  <span className="font-semibold">{card.description}</span>
                </p>
                <p className="text-sm sm:text-base">
                  Category:{" "}
                  <span className="font-medium">{card.category}</span>
                </p>
                <p className="text-sm sm:text-base">
                  Premium:{" "}
                  <span className="font-medium">{card.premiumtype}</span>
                </p>
                <p className="text-sm sm:text-base flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                  {card.isVerified && (
                    <span className="flex items-center text-green-600 gap-1 sm:gap-1.5">
                      <MdVerified /> Verified
                    </span>
                  )}
                  {card.isFeatured && (
                    <span className="flex items-center text-yellow-500 gap-1 sm:gap-1.5">
                      <FaStar /> Featured
                    </span>
                  )}
                </p>
                <p className="text-sm sm:text-base mb-1 sm:mb-2">
                  Views: <span className="font-bold">{card.views}</span>
                </p>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <button
                    onClick={() => startEdit(card)}
                    className="w-full sm:w-auto bg-blue-500 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-lg hover:bg-blue-600 text-sm sm:text-base"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCard(card.id)}
                    className="w-full sm:w-auto bg-red-500 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-lg hover:bg-red-600 text-sm sm:text-base"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardList;
