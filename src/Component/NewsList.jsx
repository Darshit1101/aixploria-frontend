import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { ChevronUp } from 'lucide-react';
import API_BASE_URL from '../Admin/utils/api';
import { api } from 'axiosApi';

const NewAi = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetchNews();

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // Add logic if dropdown used
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchNews = async () => {
    try {
      const res = await api.get(`/news`);
      setNewsData(res.data);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black w-full text-white">
      <div className="bg-[#1f1f1f] font-[Poppins] rounded-2xl p-4 w-full max-w-7xl mx-auto shadow-lg">
        <div className="h-[500px] overflow-y-auto custom-scrollbar pr-2">
          {loading ? (
            <p className="text-gray-400 text-sm">Loading news...</p>
          ) : newsData.length === 0 ? (
            <p className="text-gray-400 text-sm">No news available.</p>
          ) : (
            newsData.map((item, idx) => (
              <a
                key={item._id || idx}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-[#191919] cursor-pointer border border-[#767676] flex items-center justify-between rounded-md px-4 py-3 mb-3 text-sm text-white hover:bg-[#333] no-underline"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <span className="text-[#767676] text-xs whitespace-nowrap">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                  <span className="text-[#767676]">|</span>
                  <span className="text-[#767676] text-[13px] truncate">
                    {item.title || item.text || 'Untitled'}
                  </span>
                </div>
                <ChevronUp className="text-[#767676] border border-b-3 rounded-lg" />
              </a>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NewAi;
