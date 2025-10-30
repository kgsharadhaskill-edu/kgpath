import React from 'react';
import { Link } from 'wouter'; 
import { BlogPost } from './blogData';
import { FiArrowRight, FiClock } from 'react-icons/fi';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <Link 
        to={`/blog/${post.slug}`} 
        className="group block bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden"
    >
      <div className="flex flex-col h-full">
        <div className="overflow-hidden">
          <img 
            src={post.imageUrl} 
            alt={post.title} 
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
          />
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-lg font-bold text-gray-800 mb-2 leading-tight">
            {post.title}
          </h3>
          <p className="text-gray-600 text-sm flex-grow mb-4">
            {post.description}
          </p>
          <div className="mt-auto flex justify-between items-center text-sm text-gray-500">
            <div className="flex items-center">
              <FiClock className="mr-1.5" />
              <span>{post.readTime} mins read</span>
            </div>
            <FiArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-primary" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;