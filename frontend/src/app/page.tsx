// frontend/src/app/page.tsx

"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import BlogForm from "./BlogForm";

interface Post {
  _id: string;
  author_name: string;
  created_at: string;
  email_address: string;
  blog_content: string;
}

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = () => {
    axios.get('http://localhost:8000/api/posts/')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the posts!', error);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Blog Posts</h1>
      <BlogForm onSuccess={fetchPosts} />
      <ul className="space-y-4 mt-4">
        {posts.map(post => (
          <li key={post._id} className="p-4 bg-white shadow-md rounded-md">
            <h2 className="text-xl font-semibold">{post.author_name}</h2>
            <p className="text-gray-600">{post.blog_content}</p>
            <p className="text-sm text-gray-500">
              <small>{new Date(post.created_at).toLocaleDateString()}</small>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;