import React from 'react';
// Using wouter as per the original file structure
import { Link, useParams, Redirect } from 'wouter'; 
import { blogPosts } from './blogData'; // Make sure the import path is correct
import { FaWhatsapp } from "react-icons/fa";
import { FiLink } from "react-icons/fi";

const BlogDetailsPage: React.FC = () => {
  const params = useParams();
  const slug = params.slug;

  const post = blogPosts.find(p => p.slug === slug);

  // If the post isn't found, redirect to the main blog page
  if (!post) {
    return <Redirect to="/blog" />;
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:underline">Home</Link>
          <span className="mx-2">&gt;</span>
          <Link href="/blog" className="hover:underline">Articles</Link>
        </nav>

        <div className="lg:flex lg:flex-row-reverse lg:gap-12">
          {/* Main Content */}
          <main className="lg:w-8/12">
            <article>
              <header className="mb-8 border-b pb-4">
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
                  {post.title}
                </h1>
                <div className="flex justify-between items-center text-sm text-gray-500">
                    <p>Updated on {post.updatedDate}</p>
                    <div className="flex items-center space-x-1">
                        <button title="Share on WhatsApp" className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                            <FaWhatsapp size={20} className="text-green-500" />
                        </button>
                         <button title="Copy link" className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                            <FiLink size={20} className="text-gray-500" />
                        </button>
                    </div>
                </div>
              </header>

              {/* The prose class helps style the content from blogData */}
              <div className="prose prose-lg max-w-none">
                {post.content}
              </div>
            </article>
          </main>

          {/* Left Sidebar - Article Outline */}
          <aside className="lg:w-4/12 mt-10 lg:mt-0">
            <div className="sticky top-20">
              {post.articleOutline && post.articleOutline.length > 0 && (
                <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Article Outline</h3>
                  <ul className="space-y-3">
                    {post.articleOutline.map((item, index) => (
                      <li key={index}>
                        {/* This 'a' tag now links to the corresponding heading id */}
                        <a 
                          href={`#${item.id}`} 
                          className="text-sm text-gray-700 hover:text-primary transition-colors block"
                        >
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsPage;