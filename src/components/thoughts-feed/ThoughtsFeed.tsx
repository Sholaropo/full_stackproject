import React, { useState } from 'react';
import { Thought } from '../../types';
import './ThoughtsFeed.css';

interface Props {
  thoughts: Thought[];  
  setThoughts: React.Dispatch<React.SetStateAction<Thought[]>>; 
  sharedCounter: number;
  setSharedCounter: (n: number) => void;
  sharedMessage: string;
  setSharedMessage: (s: string) => void;
}

function ThoughtsFeed({ thoughts, sharedCounter, setSharedCounter, sharedMessage, setSharedMessage }: Props) {
  const [sortBy, setSortBy] = useState('popular');
  
  // New state for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('all');
  const [minLikes, setMinLikes] = useState(0);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  
  // New state for bookmark system
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Set<string>>(new Set());
  const [showBookmarks, setShowBookmarks] = useState(false);
  
  // New state for comment system
  const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set());
  const [comments, setComments] = useState<{[postId: string]: Array<{id: string, author: string, content: string}>}>({});
  const [newComment, setNewComment] = useState('');
  
  // New state for hide/show system
  const [hiddenPosts, setHiddenPosts] = useState<Set<string>>(new Set());
  const [showHiddenPosts, setShowHiddenPosts] = useState(false);
  
  // New state for rating system
  const [postRatings, setPostRatings] = useState<{[postId: string]: number}>({});
  const [userRatings, setUserRatings] = useState<{[postId: string]: number}>({});

  const communityPosts: Thought[] = [
    {
      id: '1',
      content: 'Just discovered an amazing productivity technique! The Pomodoro method really works for coding sessions.',
      author: 'ProductivityPro',
      timestamp: new Date(Date.now() - 0 * 24 * 60 * 60 * 1000),
      likes: 45
    },
    {
      id: '2',
      content: 'Built my first full-stack application today! React frontend with Node.js backend. Feeling accomplished!',
      author: 'FullStackDev',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      likes: 32
    },
    {
      id: '3',
      content: 'Git merge conflicts are the worst! But finally figured out how to resolve them properly.',
      author: 'GitLearner',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      likes: 28
    },
    {
      id: '4',
      content: 'CSS Grid vs Flexbox - still learning when to use which. Both are powerful tools!',
      author: 'CSSExplorer',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      likes: 19
    },
    {
      id: '5',
      content: 'Debugging JavaScript can be frustrating, but console.log is my best friend right now!',
      author: 'DebugMaster',
      timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      likes: 24
    },
    {
      id: '6',
      content: 'API integration is tricky but rewarding. Successfully connected my app to a weather API!',
      author: 'APINewbie',
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      likes: 31
    }
  ];

  const allPosts = [...thoughts, ...communityPosts];

  // Initialize sample comments and ratings
  React.useEffect(() => {
    setComments({
      '1': [
        { id: 'c1', author: 'TechGuru', content: 'Great tip! I use this technique too.' },
        { id: 'c2', author: 'CodeMaster', content: 'Thanks for sharing!' }
      ],
      '2': [
        { id: 'c3', author: 'DevLearner', content: 'Congratulations! What tech stack did you use?' }
      ]
    });
    
    // Sample ratings
    setPostRatings({
      '1': 4.2,
      '2': 3.8,
      '3': 4.5,
      '4': 3.2,
      '5': 4.0,
      '6': 3.9
    });
  }, []);

  function formatTime(timestamp: Date) {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return 'Today';
    if (days === 1) return '1 day ago';
    return `${days} days ago`;
  }

  // filter and sort posts
  const filteredPosts = allPosts.filter(post => {
    const matchesSearch = searchTerm === '' || 
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAuthor = selectedAuthor === 'all' || post.author === selectedAuthor;
    const matchesLikes = post.likes >= minLikes;
    const matchesBookmark = showBookmarks ? bookmarkedPosts.has(post.id) : true;
    const matchesHidden = showHiddenPosts ? hiddenPosts.has(post.id) : !hiddenPosts.has(post.id);
    return matchesSearch && matchesAuthor && matchesLikes && matchesBookmark && matchesHidden;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === 'popular') return b.likes - a.likes;
    if (sortBy === 'recent') return b.timestamp.getTime() - a.timestamp.getTime();
    return 0;
  });

  // like/unlike toggle
  function handleLike(postId: string) {
    setLikedPosts(prev => {
      const newLikedPosts = new Set(prev);
      if (newLikedPosts.has(postId)) newLikedPosts.delete(postId);
      else newLikedPosts.add(postId);
      return newLikedPosts;
    });
  }

  // bookmark/unbookmark toggle
  function handleBookmark(postId: string) {
    setBookmarkedPosts(prev => {
      const newBookmarkedPosts = new Set(prev);
      if (newBookmarkedPosts.has(postId)) {
        newBookmarkedPosts.delete(postId);
      } else {
        newBookmarkedPosts.add(postId);
      }
      return newBookmarkedPosts;
    });
  }

  // toggle comments section
  function toggleComments(postId: string) {
    setExpandedComments(prev => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(postId)) {
        newExpanded.delete(postId);
      } else {
        newExpanded.add(postId);
      }
      return newExpanded;
    });
  }

  // add new comment
  function addComment(postId: string) {
    if (newComment.trim()) {
      const comment = {
        id: Date.now().toString(),
        author: 'You',
        content: newComment.trim()
      };
      
      setComments(prev => ({
        ...prev,
        [postId]: [...(prev[postId] || []), comment]
      }));
      
      setNewComment('');
    }
  }

  // remove comment
  function removeComment(postId: string, commentId: string) {
    setComments(prev => ({
      ...prev,
      [postId]: prev[postId]?.filter(comment => comment.id !== commentId) || []
    }));
  }

  // hide/show post
  function handleHidePost(postId: string) {
    setHiddenPosts(prev => {
      const newHidden = new Set(prev);
      if (newHidden.has(postId)) {
        newHidden.delete(postId);
      } else {
        newHidden.add(postId);
      }
      return newHidden;
    });
  }

  // rate post
  function handleRatePost(postId: string, rating: number) {
    setUserRatings(prev => ({
      ...prev,
      [postId]: rating
    }));
  }

  // calculate reading time
  function calculateReadingTime(content: string) {
    const wordsPerMinute = 200;
    const words = content.split(' ').length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
  }

  // share post
  function handleShare(content: string, author: string) {
    const shareText = `"${content}" - @${author}`;
    navigator.clipboard.writeText(shareText)
      .then(() => alert('Post copied to clipboard!'))
      .catch(() => alert('Unable to copy. Please try again.'));
  }

  const authors = ['all', ...new Set(allPosts.map(post => post.author))];

  return (
    <section className="thoughts-feed">
      <div className="feed-header">
        <h2>
          {showBookmarks ? 'My Bookmarks' : showHiddenPosts ? 'Hidden Posts' : 'Community Feed'}
        </h2>
        <div className="toggle-buttons">
          <button onClick={() => setShowBookmarks(!showBookmarks)}>
            {showBookmarks ? 'Show All Posts' : 'Show Bookmarks'}
          </button>
          <button onClick={() => setShowHiddenPosts(!showHiddenPosts)}>
            {showHiddenPosts ? 'Show Visible Posts' : 'Show Hidden Posts'}
          </button>
        </div>

        <div className="search-filter-form">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-controls">
            <div className="filter-group">
              <label>Author:</label>
              <select value={selectedAuthor} onChange={e => setSelectedAuthor(e.target.value)} className="author-filter">
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
                value={minLikes}
                onChange={(e) => setMinLikes(parseInt(e.target.value) || 0)}
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

      {/* Shared state demo */}
      <div style={{ padding: '10px', background: '#f0f0f0', marginBottom: '20px' }}>
        <p>Counter: {sharedCounter} | Message: {sharedMessage}</p>
        <button onClick={() => setSharedCounter(sharedCounter + 1)}>+</button>
        <button onClick={() => setSharedCounter(sharedCounter - 1)}>-</button>
      </div>

      <div className="feed-content">
        {sortedPosts.length === 0 ? (
          <div className="empty-state">
            <p>{showBookmarks ? 'No bookmarked posts yet!' : showHiddenPosts ? 'No hidden posts!' : 'No posts found matching your criteria.'}</p>
          </div>
        ) : (
          sortedPosts.map(thought => (
            <div key={thought.id} className="feed-item">
              <div className="item-header">
                <span className="author">@{thought.author}</span>
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
                  <button
                    onClick={() => handleBookmark(thought.id)}
                  >
                    {bookmarkedPosts.has(thought.id) ? 'Bookmarked' : 'Bookmark'}
                  </button>
                  
                  <button
                    onClick={() => handleHidePost(thought.id)}
                  >
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
          ))
        )}
      </div>
    </section>
  );
}

export default ThoughtsFeed;