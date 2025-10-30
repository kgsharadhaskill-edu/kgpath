import React, { useState, useMemo } from 'react';
import { categories, blogPosts, Category } from './blogData';
import BlogCard from './BlogCard';

const BlogPage: React.FC = () => {
  // Initialize with the first category's slug, or an empty string if no categories exist
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>(categories[0]?.slug || '');

  const filteredPosts = useMemo(() => {
    // Find the full category object based on the slug
    const selectedCategory: Category | undefined = categories.find(c => c.slug === selectedCategorySlug);
    
    // If no category is found, return an empty array
    if (!selectedCategory) {
      return [];
    }

    // Filter posts where the post's category name matches the selected category's name
    return blogPosts.filter(post => post.category === selectedCategory.name);
  }, [selectedCategorySlug]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-10 text-left">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Upskill with expert articles
          </h1>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar: Categories */}
          <aside className="lg:w-1/4 xl:w-1/5">
            <nav className="sticky top-20 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <ul className="space-y-1">
                {categories.map((category) => (
                  <li key={category.slug}>
                    <button
                      onClick={() => setSelectedCategorySlug(category.slug)}
                      className={`w-full text-left px-4 py-2.5 rounded-md text-sm font-medium transition-colors duration-200 ${
                        selectedCategorySlug === category.slug
                          ? 'bg-primary/10 text-primary font-bold'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Right Content: Blog Cards */}
          <main className="lg:w-3/4 xl:w-4/5">
            {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
                    {filteredPosts.map((post) => (
                        // The key MUST be a unique primitive value (string or number)
                        // post.id is the correct value to use here.
                        <BlogCard key={post.id} post={post} />
                    ))}
                </div>
            ) : (
              <div className="flex items-center justify-center h-64 bg-white rounded-lg border border-gray-200">
                <p className="text-center text-gray-500">
                  No articles found in this category.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;