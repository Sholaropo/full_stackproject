import React, { useState, useEffect } from 'react';
import { Thought } from '../../types';
import { useUserData } from '../../hooks/useUserData';
import { usePostActions } from '../../hooks/usePostActions';
import PostFilters from './PostFilters';
import PostItem from './PostItem';
import { samplePosts, sampleComments, sampleRatings } from '../../data/samplePosts';
import { getUserInfo, formatTime, calculateReadingTime } from '../../utils/helpers';
import './ThoughtsFeed.css';

interface Props {
  thoughts: Thought[];
  setThoughts: React.Dispatch<React.SetStateAction<Thought[]>>;
}

function ThoughtsFeed({ thoughts, setThoughts }: Props) {
  const [sortBy, setSortBy] = useState('popular');
  const [filters, setFilters] = useState({
    searchTerm: '',
    selectedAuthor: 'all',
    minLikes: 0,
    showBookmarks: false,
    showHiddenPosts: false
  });
  
  const { getUserCount } = useUserData();
  const { 
    likedPosts, bookmarkedPosts, expandedComments, hiddenPosts, 
    userRatings, comments, newComment, setComments, setNewComment,
    handleLike, handleBookmark, toggleComments, addComment, removeComment,
    handleHidePost, handleRatePost, handleShare 
  } = usePostActions();

  const allPosts = [...thoughts, ...samplePosts];

  // Initialize sample data
  useEffect(() => {
    setComments(sampleComments);
  }, [setComments]);

  // Data processing
  const filteredPosts = allPosts.filter(post => {
    const search = filters.searchTerm.toLowerCase();
    return (!search || post.content.toLowerCase().includes(search) || post.author.toLowerCase().includes(search)) &&
           (filters.selectedAuthor === 'all' || post.author === filters.selectedAuthor) &&
           post.likes >= filters.minLikes &&
           (!filters.showBookmarks || bookmarkedPosts.has(post.id)) &&
           (filters.showHiddenPosts ? hiddenPosts.has(post.id) : !hiddenPosts.has(post.id));
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => 
    sortBy === 'popular' ? b.likes - a.likes : b.timestamp.getTime() - a.timestamp.getTime()
  );

  const authors = ['all', ...new Set(allPosts.map(post => post.author))];

  return (
    <section className="thoughts-feed">
      <div className="feed-header">
        <h2>{filters.showBookmarks ? 'My Bookmarks' : filters.showHiddenPosts ? 'Hidden Posts' : 'Community Feed'}</h2>
        
        <div style={{ padding: '10px', background: '#e0e0e0', marginBottom: '10px' }}>
          <p>Total Users: {getUserCount()}</p>
        </div>
        
        <div className="toggle-buttons">
          <button onClick={() => setFilters(prev => ({ ...prev, showBookmarks: !prev.showBookmarks }))}>
            {filters.showBookmarks ? 'Show All Posts' : 'Show Bookmarks'}
          </button>
          <button onClick={() => setFilters(prev => ({ ...prev, showHiddenPosts: !prev.showHiddenPosts }))}>
            {filters.showHiddenPosts ? 'Show Visible Posts' : 'Show Hidden Posts'}
          </button>
        </div>

        <PostFilters filters={filters} setFilters={setFilters} sortBy={sortBy} setSortBy={setSortBy} authors={authors} />
      </div>

      <div className="feed-content">
        {sortedPosts.length === 0 ? (
          <div className="empty-state">
            <p>{filters.showBookmarks ? 'No bookmarked posts yet!' : filters.showHiddenPosts ? 'No hidden posts!' : 'No posts found matching your criteria.'}</p>
          </div>
        ) : (
          sortedPosts.map(thought => (
            <PostItem
              key={thought.id}
              thought={thought}
              userInfo={getUserInfo(thought.author)}
              likedPosts={likedPosts}
              bookmarkedPosts={bookmarkedPosts}
              expandedComments={expandedComments}
              hiddenPosts={hiddenPosts}
              userRatings={userRatings}
              postRatings={sampleRatings}
              comments={comments}
              newComment={newComment}
              setNewComment={setNewComment}
              formatTime={formatTime}
              calculateReadingTime={calculateReadingTime}
              handleLike={handleLike}
              handleBookmark={handleBookmark}
              toggleComments={toggleComments}
              addComment={addComment}
              removeComment={removeComment}
              handleHidePost={handleHidePost}
              handleRatePost={handleRatePost}
              handleShare={handleShare}
            />
          ))
        )}
      </div>
    </section>
  );
}

export default ThoughtsFeed;