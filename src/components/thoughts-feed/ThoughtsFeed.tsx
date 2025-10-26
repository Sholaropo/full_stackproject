import React, { useState } from 'react'; // import React and useState hook
import { Thought } from '../../types'; // import Thought type definition
import { useUserData } from '../../hooks/useUserData'; // custom hook for user data
import { usePostActions } from '../../hooks/usePostActions'; // custom hook for post actions
import { UserService } from '../../services/userService'; // service layer for business logic
import './ThoughtsFeed.css'; // import CSS styles

// define props interface for the component
interface Props {
  thoughts: Thought[]; // array of thoughts from parent
  setThoughts: React.Dispatch<React.SetStateAction<Thought[]>>; // function to update thoughts
  sharedCounter: number; // shared counter value
  setSharedCounter: (n: number) => void; // function to update counter
  sharedMessage: string; // shared message value
  setSharedMessage: (s: string) => void; // function to update message
}

function ThoughtsFeed({ thoughts, sharedCounter, setSharedCounter, sharedMessage, setSharedMessage }: Props) {
  const [sortBy, setSortBy] = useState('popular'); // state for sorting posts
  
  // ARCHITECTURE IMPLEMENTATION:
  // This component demonstrates layered architecture:
  // 1. COMPONENT (this file) - handles UI and user interactions
  // 2. CUSTOM HOOK (useUserData) - manages reusable state logic
  // 3. SERVICE LAYER (UserService) - handles business rules and validation
  // 4. REPOSITORY LAYER (UserRepository) - handles data access and storage
  // 
  // Flow: Component → Hook → Service → Repository
  
  // use custom hook for user data management
  const { users, getUserByUsernameHook, getUserCount } = useUserData(); // get user data from hook
  
  // use custom hook for post actions
  const {
    likedPosts,
    bookmarkedPosts,
    expandedComments,
    hiddenPosts,
    userRatings,
    comments,
    newComment,
    setComments,
    setNewComment,
    handleLike,
    handleBookmark,
    toggleComments,
    addComment,
    removeComment,
    handleHidePost,
    handleRatePost,
    handleShare
  } = usePostActions(); // get post action handlers from hook
  
  // just in case
  if (users.length > 0) {
    console.log('we have users');
  }
  
  // combined filter and view states
  const [filters, setFilters] = useState({
    searchTerm: '', // search input value
    selectedAuthor: 'all', // selected author filter
    minLikes: 0, // minimum likes filter
    showBookmarks: false, // toggle bookmark view
    showHiddenPosts: false // toggle hidden posts view
  });
  
  // rating states
  const [postRatings, setPostRatings] = useState<{[postId: string]: number}>({}); // post ratings object

  // sample posts - hardcoded community posts
  const communityPosts: Thought[] = [
    {
      id: '1', // unique post ID
      content: 'Just discovered an amazing productivity technique! The Pomodoro method really works for coding sessions.', // post content
      author: 'ProductivityPro', // author username
      timestamp: new Date(Date.now() - 0 * 24 * 60 * 60 * 1000), // current time
      likes: 45 // number of likes
    },
    {
      id: '2',
      content: 'Built my first full-stack application today! React frontend with Node.js backend. Feeling accomplished!',
      author: 'FullStackDev',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      likes: 32
    },
    {
      id: '3',
      content: 'Git merge conflicts are the worst! But finally figured out how to resolve them properly.',
      author: 'GitLearner',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      likes: 28
    },
    {
      id: '4',
      content: 'CSS Grid vs Flexbox - still learning when to use which. Both are powerful tools!',
      author: 'CSSExplorer',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      likes: 19
    },
    {
      id: '5',
      content: 'Debugging JavaScript can be frustrating, but console.log is my best friend right now!',
      author: 'DebugMaster',
      timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
      likes: 24
    },
    {
      id: '6',
      content: 'API integration is tricky but rewarding. Successfully connected my app to a weather API!',
      author: 'APINewbie',
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      likes: 31
    }
  ];

  const allPosts = [...thoughts, ...communityPosts]; // combine user thoughts with community posts

  // setup sample data - initialize comments and ratings
  React.useEffect(() => {
    setComments({ // set sample comments for posts
      '1': [
        { id: 'c1', author: 'TechGuru', content: 'Great tip! I use this technique too.' }, // comment 1
        { id: 'c2', author: 'CodeMaster', content: 'Thanks for sharing!' } // comment 2
      ],
      '2': [
        { id: 'c3', author: 'DevLearner', content: 'Congratulations! What tech stack did you use?' } // comment 3
      ]
    });
    
    setPostRatings({ // set sample ratings for posts
      '1': 4.2, // rating for post 1
      '2': 3.8, // rating for post 2
      '3': 4.5, // rating for post 3
      '4': 3.2, // rating for post 4
      '5': 4.0, // rating for post 5
      '6': 3.9  // rating for post 6
    });
  }, []); // empty dependency array - runs once on mount

  // get user by name
  function getUserInfo(username: string) {
    return UserService.getUserByUsername(username); // this calls the service
  }
  
  // const oldWay = getAllUsers(); // old way before hook
  // console.log('old users:', oldWay);

  // format time - make it readable
  function formatTime(timestamp: Date) {
    const now = new Date(); // get current time
    const diff = now.getTime() - timestamp.getTime(); // calculate difference in milliseconds
    const days = Math.floor(diff / (1000 * 60 * 60 * 24)); // convert to days

    if (days === 0) return 'Today'; // if same day
    if (days === 1) return '1 day ago'; // if yesterday
    return `${days} days ago`; // if more than 1 day ago
  }

  // filter posts - apply search and filter criteria
  const filteredPosts = allPosts.filter(post => {
    const matchesSearch = filters.searchTerm === '' || // if no search term
      post.content.toLowerCase().includes(filters.searchTerm.toLowerCase()) || // content matches search
      post.author.toLowerCase().includes(filters.searchTerm.toLowerCase()); // author matches search
    const matchesAuthor = filters.selectedAuthor === 'all' || post.author === filters.selectedAuthor; // author filter
    const matchesLikes = post.likes >= filters.minLikes; // minimum likes filter
    const matchesBookmark = filters.showBookmarks ? bookmarkedPosts.has(post.id) : true; // bookmark filter
    const matchesHidden = filters.showHiddenPosts ? hiddenPosts.has(post.id) : !hiddenPosts.has(post.id); // hidden filter
    return matchesSearch && matchesAuthor && matchesLikes && matchesBookmark && matchesHidden; // all filters must match
  });

  // sort posts - order posts by selected criteria
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === 'popular') return b.likes - a.likes; // sort by likes descending
    if (sortBy === 'recent') return b.timestamp.getTime() - a.timestamp.getTime(); // sort by time descending
    return 0; // no sorting
  });

  // calculate reading time - basic calculation
  function calculateReadingTime(content: string) {
    const wordsPerMinute = 200;
    const words = content.split(' ').length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes || 1; // fallback but not ideal
  }

  const authors = ['all', ...new Set(allPosts.map(post => post.author))];

  return (
    <section className="thoughts-feed">
      <div className="feed-header">
        <h2>
          {filters.showBookmarks ? 'My Bookmarks' : filters.showHiddenPosts ? 'Hidden Posts' : 'Community Feed'}
        </h2>
        
        {/* show user count from repository - inline styles */}
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

        <div className="search-filter-form">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search posts..."
              value={filters.searchTerm}
              onChange={e => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
              className="search-input"
            />
          </div>

          <div className="filter-controls">
            <div className="filter-group">
              <label>Author:</label>
              <select value={filters.selectedAuthor} onChange={e => setFilters(prev => ({ ...prev, selectedAuthor: e.target.value }))} className="author-filter">
                {authors.map(author => (
                  <option key={author} value={author}>{author === 'all' ? 'All Authors' : author}</option>
                ))}
              </select>
            </div>
            
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
            
            <div className="sort-group">
              <label>Sort:</label>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
                <option value="popular">Popular</option>
                <option value="recent">Recent</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* shared state demo - inline styles */}
      <div style={{ padding: '10px', background: '#f0f0f0', marginBottom: '20px' }}>
        <p>Counter: {sharedCounter} | Message: {sharedMessage}</p>
        <button onClick={() => setSharedCounter(sharedCounter + 1)}>+</button>
        <button onClick={() => setSharedCounter(sharedCounter - 1)}>-</button>
      </div>

      <div className="feed-content">
        {sortedPosts.length === 0 ? (
          <div className="empty-state">
            <p>{filters.showBookmarks ? 'No bookmarked posts yet!' : filters.showHiddenPosts ? 'No hidden posts!' : 'No posts found matching your criteria.'}</p>
          </div>
        ) : (
          sortedPosts.map(thought => {
            const userInfo = getUserInfo(thought.author);
            return (
              <div key={thought.id} className="feed-item">
                <div className="item-header">
                  <span className="author">@{thought.author}</span>
                  {userInfo && (
                    <span style={{ fontSize: '12px', color: '#666' }}>
                      ({userInfo.followerCount || 0} followers)
                    </span>
                  )}
                  <span className="time">{formatTime(thought.timestamp)}</span>
                </div>

                <div className="content">
                  <p>{thought.content}</p>
                  <div className="post-meta">
                    <span className="reading-time">📖 {calculateReadingTime(thought.content)} min read</span>
                    <div className="rating-display">
                      <span className="rating-label">Rating:</span>
                      <div className="stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={`star ${star <= (userRatings[thought.id] || postRatings[thought.id] || 0) ? 'filled' : ''}`}
                            onClick={() => handleRatePost(thought.id, star)}
                          >
                            ⭐
                          </span>
                        ))}
                        <span className="rating-number">
                          ({(userRatings[thought.id] || postRatings[thought.id] || 0).toFixed(1)})
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="actions">
                  <div className="left-actions">
                    <button
                      className={`like-btn ${likedPosts.has(thought.id) ? 'liked' : ''}`}
                      onClick={() => handleLike(thought.id)}
                    >
                      {likedPosts.has(thought.id) ? '❤️' : '🤍'} {thought.likes + (likedPosts.has(thought.id) ? 1 : 0)}
                    </button>
                    
                    <button onClick={() => toggleComments(thought.id)}>
                      💬 ({comments[thought.id]?.length || 0})
                    </button>
                    
                    <button onClick={() => handleShare(thought.content, thought.author)}>Share</button>
                  </div>
                  
                  <div className="right-actions">
                    <button onClick={() => handleBookmark(thought.id)}>
                      {bookmarkedPosts.has(thought.id) ? 'Bookmarked' : 'Bookmark'}
                    </button>
                    
                    <button onClick={() => handleHidePost(thought.id)}>
                      {hiddenPosts.has(thought.id) ? 'Show' : 'Hide'}
                    </button>
                  </div>
                </div>

                {expandedComments.has(thought.id) && (
                  <div className="comments-section">
                    <h4>Comments</h4>
                    {comments[thought.id]?.map(comment => (
                      <div key={comment.id} className="comment">
                        <div className="comment-header">
                          <span>@{comment.author}</span>
                          {comment.author === 'You' && (
                            <button onClick={() => removeComment(thought.id, comment.id)}>
                              Delete
                            </button>
                          )}
                        </div>
                        <p>{comment.content}</p>
                      </div>
                    ))}
                    
                    <div className="add-comment">
                      <input
                        type="text"
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                      />
                      <button onClick={() => addComment(thought.id)}>Post</button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}

export default ThoughtsFeed;