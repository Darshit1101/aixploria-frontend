import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { FaRegEdit } from 'react-icons/fa';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { IoSaveOutline } from 'react-icons/io5';
import { api } from 'axiosApi';

const AddCategory = () => {
  const [name, setName] = useState('');
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState('');

  // Fetch categories on load
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await api.get(`/categories`);
      setCategories(res.data);
    } catch (error) {
      console.error('Error fetching categories', error);
    }
  };

  // Add new category
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(`/categories/add`, { name });
      Swal.fire('Success', res.data.message || 'Category added!', 'success');
      setName('');
      fetchCategories();
    } catch (error) {
      Swal.fire('Error', error.response?.data?.message || 'Something went wrong', 'error');
    }
  };

  // Delete category
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This will delete the category.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/categories/${id}`);
        Swal.fire('Deleted!', 'Category deleted.', 'success');
        fetchCategories();
      } catch (error) {
        Swal.fire('Error', 'Failed to delete category.', 'error');
      }
    }
  };

  // Edit category
  const handleEdit = (id, name) => {
    setEditingId(id);
    setEditingName(name);
  };

  const handleUpdate = async (id) => {
    try {
      await api.put(`/categories/${id}`, { name: editingName });
      Swal.fire('Updated!', 'Category updated.', 'success');
      setEditingId(null);
      setEditingName('');
      fetchCategories();
    } catch (error) {
      Swal.fire('Error', 'Update failed.', 'error');
    }
  };

  return (
    <div className="font-[Poppins]">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Add Category</h1>

      {/* Add Category Form */}
      <div className="max-w-7xl p-6 bg-white shadow rounded mb-10">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded mb-4"
            required
          />
          <button
            type="submit"
            className="w-[300px] bg-orange-500 text-white py-2 rounded hover:bg-blue-700"
          >
            Add Category
          </button>
        </form>
      </div>

      {/* Category List */}
      <div className="max-w-7xl  bg-white shadow rounded p-6">
        <h2 className="text-xl font-semibold mb-4">Category List</h2>
        <table className="w-full table-auto border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-4">
                  No categories found.
                </td>
              </tr>
            ) : (
              categories.map((cat, index) => (
                <tr key={cat.id} className="border-t">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">
                    {editingId === cat.id ? (
                      <input
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        className="border px-2 py-1 rounded w-full"
                      />
                    ) : (
                      cat.name
                    )}
                  </td>
                  <td className="px-4 py-2 text-right">
                    <div className="flex justify-end space-x-2">
                      {editingId === cat.id ? (
                        <button
                          onClick={() => handleUpdate(cat.id)}
                          className="flex items-center bg-green-600 text-white px-2 py-1 rounded-full hover:underline"
                        >
                          <IoSaveOutline /> &nbsp;Save
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEdit(cat.id, cat.name)}
                          className="flex items-center bg-blue-600 text-white px-2 py-1 rounded-full hover:underline"
                        >
                          <FaRegEdit className="mr-1" />
                          Edit
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(cat.id)}
                        className="flex items-center bg-red-600 text-white px-2 py-1 rounded-full hover:underline"
                      >
                        <MdOutlineDeleteOutline /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddCategory;
