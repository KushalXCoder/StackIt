'use client';
import React,{useState,useEffect} from 'react';
import Editor from '../../../Components/editor';
export default function AskQuestion() {
    const [title,setTitle]=useState("");
  return (
    <div className="font-funnelDisplay">
<form
  //onSubmit={handleSubmit} 
  className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg"
>
  <h2 className="text-2xl font-bold mb-6 text-gray-800">Ask a Question</h2>

  {/* Title Input */}
  <div className="mb-5">
    <label className="block text-gray-700 font-medium mb-2">Title</label>
    <input
      type="text"
      name="title"
      placeholder="Title"
      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Description Editor */}
  <div className="mb-5">
    <label className="block text-gray-700 font-medium mb-2">Description</label>
    <div className="bg-white border border-gray-300 rounded-xl p-2">
      <Editor />
    </div>
  </div>

  {/* Tags Input */}
  <div className="mb-6">
    <label className="block text-gray-700 font-medium mb-2">Tags</label>
    <input
      type="text"
      name="tags"
      placeholder="Tags"
      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Submit Button */}
  <button
    type="submit"
    className="w-full bg-green-500 text-white py-3 rounded-xl hover:bg-green-600 transition duration-300 font-semibold"
  >
    Submit
  </button>
</form>
    </div>
  );
}