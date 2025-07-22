import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import API_BASE_URL from '../utils/api';
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import AddGPT from '../Pages/AddGPT';

const AddGPTCategory = () => {
    const [name, setName] = useState('');
    const [categories, setCategories] = useState([]);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/api/gpt-categories`);
            setCategories(res.data);
        } catch (error) {
            Swal.fire('Error', 'Failed to fetch categories', 'error');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!name.trim()) return;

            if (editingId) {
                await axios.put(`${API_BASE_URL}/api/gpt-categories/${editingId}`, { name });
                Swal.fire('Updated!', 'Category updated successfully.', 'success');
            } else {
                await axios.post(`${API_BASE_URL}/api/gpt-categories`, { name });
                Swal.fire('Created!', 'Category added successfully.', 'success');
            }

            setName('');
            setEditingId(null);
            fetchCategories();
        } catch (error) {
            Swal.fire('Error', error.response?.data?.message || 'Something went wrong.', 'error');
        }
    };

    const handleEdit = (category) => {
        setName(category.name);
        setEditingId(category.id);
    };

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: 'This category will be permanently deleted!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
        });

        if (confirm.isConfirmed) {
            try {
                await axios.delete(`${API_BASE_URL}/api/gpt-categories/${id}`);
                Swal.fire('Deleted!', 'Category deleted successfully.', 'success');
                fetchCategories();
            } catch (error) {
                Swal.fire('Error', 'Failed to delete category.', 'error');
            }
        }
    };

    return (
        <>
            <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
                {editingId ? 'Edit Category' : 'Add GPT Category'}
            </h1>
            <div className="font-[Poppins] max-w-7xl mx-auto mt-10">
                <h1 className="text-2xl font-bold text-gray-800 mb-6"></h1>

                {/* Form */}
                <form onSubmit={handleSubmit} className="bg-white shadow-md p-6 rounded mb-8">
                    <input
                        type="text"
                        placeholder="Enter category name"
                        className="w-full border px-4 py-2 rounded mb-4"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                    >
                        {editingId ? 'Update Category' : 'Add Category'}
                    </button>
                </form>

                {/* List */}
                <div className="bg-white shadow-md p-6 rounded">
                    <h2 className="text-lg font-semibold mb-4">All Categories</h2>
                    <table className="w-full border text-left">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-2 px-4">#</th>
                                <th className="py-2 px-4">Name</th>
                                <th className="py-2 px-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.length === 0 ? (
                                <tr>
                                    <td colSpan="3" className="py-4 px-4 text-center">No categories found.</td>
                                </tr>
                            ) : (
                                categories.map((cat, index) => (
                                    <tr key={cat.id} className="border-t">
                                        <td className="py-2 px-4">{index + 1}</td>
                                        <td className="py-2 px-4">{cat.name}</td>
                                        <td className="py-2 px-4 text-right space-x-2">
                                            <button
                                                onClick={() => handleEdit(cat)}
                                                className="text-blue-600 hover:underline"
                                            >
                                                <FaRegEdit /> Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(cat.id)}
                                                className="text-red-600 hover:underline ml-2"
                                            >
                                                <MdOutlineDeleteOutline /> Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <AddGPT />
        </>
    );
};

export default AddGPTCategory;
