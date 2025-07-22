import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    title: '',
    image: '',
    description: '',
    link: '',
    subitems: [],
  });

  // Fetch blogs on mount
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get('/api/blogs');
      setBlogs(res.data);
    } catch (err) {
      console.error('Error fetching blogs:', err);
    }
  };

  const resetForm = () => {
    setForm({
      title: '',
      image: '',
      description: '',
      link: '',
      subitems: [],
    });
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubitemChange = (index, key, value) => {
    const updated = [...form.subitems];
    updated[index][key] = value;
    setForm({ ...form, subitems: updated });
  };

  const addSubitem = () => {
    setForm(prev => ({
      ...prev,
      subitems: [...prev.subitems, { title: '', image: '', description: '', link: '' }],
    }));
  };

  const removeSubitem = (index) => {
    const updated = form.subitems.filter((_, i) => i !== index);
    setForm({ ...form, subitems: updated });
  };

  const handleEdit = (blog) => {
    setForm({
      title: blog.title || '',
      image: blog.image || '',
      description: blog.description || '',
      link: blog.link || '',
      subitems: blog.subitems || [],
    });
    setEditingId(blog.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/blogs/${id}`);
      fetchBlogs();
    } catch (err) {
      console.error('Error deleting blog:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`/api/blogs/${editingId}`, form);
      } else {
        await axios.post('/api/blogs', form);
      }
      fetchBlogs();
      resetForm();
    } catch (err) {
      console.error('Submit error:', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">{editingId ? 'Edit Blog' : 'Add Blog'}</h2>

      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-900 p-6 rounded-lg shadow">
        <input className="w-full p-2 rounded bg-gray-800 text-white" name="title" value={form.title} onChange={handleChange} placeholder="Title" />
        <input className="w-full p-2 rounded bg-gray-800 text-white" name="image" value={form.image} onChange={handleChange} placeholder="Image URL" />
        <textarea className="w-full p-2 rounded bg-gray-800 text-white" name="description" value={form.description} onChange={handleChange} placeholder="Description" />
        <input className="w-full p-2 rounded bg-gray-800 text-white" name="link" value={form.link} onChange={handleChange} placeholder="Main Link" />

        <div>
          <h3 className="text-xl font-semibold mt-4 mb-2">Sub Items</h3>
          {form.subitems.map((item, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-2 bg-gray-800 p-4 rounded mb-2">
              <input className="p-2 rounded bg-gray-700 text-white" value={item.title} onChange={(e) => handleSubitemChange(index, 'title', e.target.value)} placeholder="Sub Title" />
              <input className="p-2 rounded bg-gray-700 text-white" value={item.image} onChange={(e) => handleSubitemChange(index, 'image', e.target.value)} placeholder="Sub Image" />
              <input className="p-2 rounded bg-gray-700 text-white" value={item.link} onChange={(e) => handleSubitemChange(index, 'link', e.target.value)} placeholder="Sub Link" />
              <textarea className="p-2 rounded bg-gray-700 text-white col-span-full" value={item.description} onChange={(e) => handleSubitemChange(index, 'description', e.target.value)} placeholder="Sub Description" />
              <button type="button" className="text-red-400 mt-2" onClick={() => removeSubitem(index)}>Remove</button>
            </div>
          ))}
          <button type="button" className="bg-blue-600 text-white px-4 py-2 rounded" onClick={addSubitem}>Add Subitem</button>
        </div>

        <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded">
          {editingId ? 'Update Blog' : 'Add Blog'}
        </button>
      </form>

      <div className="mt-10">
        <h3 className="text-2xl font-bold mb-4">All Blogs</h3>
        {blogs.map((blog) => (
          <div key={blog.id} className="bg-gray-800 p-4 rounded-lg mb-4 text-white">
            <h4 className="text-xl font-semibold">{blog.title}</h4>
            <p className="text-sm mb-2">{blog.description}</p>
            <img src={blog.image} alt={blog.title} className="w-full max-h-48 object-cover rounded mb-2" />
            <a href={blog.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline mb-2 block">Visit Link</a>

            <div className="ml-4">
              {blog.subitems && blog.subitems.map((item, i) => (
                <div key={i} className="bg-gray-700 p-3 rounded mt-2">
                  <h5 className="text-lg font-semibold">{item.title}</h5>
                  <p className="text-sm">{item.description}</p>
                  {item.image && <img src={item.image} className="mt-1 max-h-32" alt="sub" />}
                  <a href={item.link} target="_blank" className="text-blue-300 text-sm underline">Sub Link</a>
                </div>
              ))}
            </div>

            <div className="mt-4 space-x-2">
              <button onClick={() => handleEdit(blog)} className="bg-yellow-500 px-3 py-1 rounded">Edit</button>
              <button onClick={() => handleDelete(blog.id)} className="bg-red-500 px-3 py-1 rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
