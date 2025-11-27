"use client"
import Link from 'next/link';
import React, { useState } from 'react';

export default function SubCategoryAdd() {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  return (
    <div className="w-full p-4 md:p-8">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">Add Sub Category</h2>

      <div className="w-2xl  flex flex-col gap-3">
        <div className="flex flex-col gap-3">
          <label className="font-medium">Sub Category Name</label>
          <input
            type="text"
            placeholder="Enter SubCategory name"
            className="border rounded-xl p-3 w-full focus:outline-none focus:ring"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label className="font-medium">Category</label>
          <select
            className="border rounded-xl p-3 w-full focus:outline-none focus:ring"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div className="flex flex-col gap-3">
          <label className="font-medium">Status</label>
          <select
            className="border rounded-xl p-3 w-full focus:outline-none focus:ring"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className='flex gap-2'>
          <div className="flex flex-col gap-2">
            <label className="font-medium">Upload Image</label>
            <div className="w-28 h-32 border rounded-xl overflow-hidden flex items-center justify-center bg-gray-100">
              {preview ? (
                <img src={preview} alt="preview" className="w-full h-full object-cover" />
              ) : (
                <span className="text-xs text-gray-500">No image</span>
              )}
            </div>
          </div>
          <div className="flex items-center justify-center border rounded-xl p-4 border-dashed cursor-pointer hover:bg-gray-50 transition">
            <input type="file" className="hidden" id="upload" onChange={handleFileChange} />
            <label htmlFor="upload" className="flex flex-col items-center text-center text-sm text-gray-500 cursor-pointer">
              <span className="text-4xl mb-2">📤</span>
              <span>Upload Maximum allowed file size is 10MB</span>
            </label>
          </div>
        </div>

      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4 mt-12">
        <Link href={"/sub-category"}>
          <button className="rounded-full border border-gray text-gray font-semibold px-8 py-2 cursor-pointer hover:border-primary hover:text-primary">
            Cancel
          </button>
        </Link>
        <button className="rounded-full bg-primary px-8 py-2 cursor-pointer font-semibold text-white hover:bg-primary/90">
          Save
        </button>
      </div>
    </div>
  );
}
