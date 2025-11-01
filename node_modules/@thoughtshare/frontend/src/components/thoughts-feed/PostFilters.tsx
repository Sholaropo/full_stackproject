// Import React for component functionality
import React from 'react';

// Define the props interface for PostFilters component
interface PostFiltersProps {
  filters: {
    searchTerm: string;
    selectedAuthor: string;
    minLikes: number;
    showBookmarks: boolean;
    showHiddenPosts: boolean;
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    searchTerm: string;
    selectedAuthor: string;
    minLikes: number;
    showBookmarks: boolean;
    showHiddenPosts: boolean;
  }>>;
  sortBy: string;
  setSortBy: (value: string) => void;
  authors: string[];
}

// PostFilters component for handling search and filter controls
function PostFilters({ filters, setFilters, sortBy, setSortBy, authors }: PostFiltersProps) {
  return (
    <div className="search-filter-form">
      {/* Search input box */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search posts..."
          value={filters.searchTerm}
          onChange={e => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
          className="search-input"
        />
      </div>

      {/* Filter controls section */}
      <div className="filter-controls">
        {/* Author filter dropdown */}
        <div className="filter-group">
          <label>Author:</label>
          <select 
            value={filters.selectedAuthor} 
            onChange={e => setFilters(prev => ({ ...prev, selectedAuthor: e.target.value }))} 
            className="author-filter"
          >
            {authors.map(author => (
              <option key={author} value={author}>
                {author === 'all' ? 'All Authors' : author}
              </option>
            ))}
          </select>
        </div>
        
        {/* Minimum likes filter */}
        <div className="filter-group">
          <label>Min Likes:</label>
          <input
            type="number"
            min="0"
            value={filters.minLikes}
            onChange={(e) => setFilters(prev => ({ ...prev, minLikes: parseInt(e.target.value) || 0 }))}
            className="likes-filter"
            placeholder="0"
          />
        </div>
        
        {/* Sort options */}
        <div className="sort-group">
          <label>Sort:</label>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="popular">Popular</option>
            <option value="recent">Recent</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default PostFilters;
