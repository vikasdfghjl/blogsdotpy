// frontend/src/app/BlogForm.tsx
import { useState } from "react";
import axios from "axios";

interface BlogFormProps {
  onSuccess: () => void;
}

const BlogForm = ({ onSuccess }: BlogFormProps) => {
  const [authorName, setAuthorName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [blogContent, setBlogContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/posts/create/', {
        author_name: authorName,
        email_address: emailAddress,
        blog_content: blogContent,
      });
      onSuccess();
      setAuthorName("");
      setEmailAddress("");
      setBlogContent("");
    } catch (error) {
      console.error('There was an error creating the post!', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white shadow-md rounded-md">
      <div>
        <label className="block text-sm font-medium text-gray-700">Author Name</label>
        <input
          type="text"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email Address</label>
        <input
          type="email"
          value={emailAddress}
          onChange={(e) => setEmailAddress(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Blog Content</label>
        <textarea
          value={blogContent}
          onChange={(e) => setBlogContent(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
        />
      </div>
      <button
        type="submit"
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Create Blog
      </button>
    </form>
  );
};

export default BlogForm;