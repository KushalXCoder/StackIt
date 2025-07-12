'use client';

import React,{useState,useEffect} from 'react';
import Editor from '../../../Components/editor';
export default function AskQuestion() {
    const [title,setTitle]=useState("");
    const[description,setDescription]=useState("");
    const[tags,setTags]=useState("");
    const handsubmit=async(e)=>{
        e.preventDefault();
         const parser = new DOMParser();
    const doc = parser.parseFromString(description, "text/html");

    const base64Images = Array.from(doc.querySelectorAll("img"))
  .map(img => img.src)
  .filter(src => src.startsWith("data:image"));
  const tagsList = tags.trim().split(/\s+/);
  const plainTextDescription = doc.body.innerText;
    await fetch("http://localhost:9000/create/questions", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title:title, content: plainTextDescription, tags:tagsList,images:base64Images }),
    });
    }

  return (
    <div className="font-funnelDisplay px-20 bg-gray-100 p-5">
        <form className="max-w-full mx-auto p-6 bg-white rounded-2xl shadow-lg mb-6" onSubmit={handsubmit}>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Ask a Question</h2>

          {/* Title Input */}
          <div className="mb-5">
            <label className="block text-gray-700 font-medium mb-2">Title</label>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
              className="w-4/6 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description Editor */}
          <div className="mb-5">
            <label className="block text-gray-700 font-medium mb-2">Description</label>
            <div className="bg-white border border-gray-300 rounded-xl p-2">
              <Editor onChange={setDescription}/>
            </div>
          </div>

          {/* Tags Input */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Tags</label>
            <input
              type="text"
              placeholder="Tags"
              value={tags}
              onChange={e=>setTags(e.target.value)}
              className="w-4/6 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-1/4 bg-green-300 text-white py-3 rounded-xl hover:bg-blue-700 transition duration-300 font-semibold"
          >
            Submit
          </button>
      </form>
    </div>
  );
}