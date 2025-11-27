// Import React for component functionality

// Define the props interface for PostComments component
interface PostCommentsProps {
  postId: string;
  comments: Array<{id: string, author: string, content: string}>;
  newComment: string;
  setNewComment: (value: string) => void;
  addComment: (postId: string) => void;
  removeComment: (postId: string, commentId: string) => void;
}

// PostComments component for handling comment display and interaction
function PostComments({ 
  postId, 
  comments, 
  newComment, 
  setNewComment, 
  addComment, 
  removeComment 
}: PostCommentsProps) {
  return (
    <div className="comments-section">
      <h4>Comments</h4>
      
      {/* Render each comment for this post */}
      {comments.map(comment => (
        <div key={comment.id} className="comment">
          <div className="comment-header">
            <span>@{comment.author}</span>
            {/* Show delete button only for user's own comments */}
            {comment.author === 'You' && (
              <button onClick={() => removeComment(postId, comment.id)}>
                Delete
              </button>
            )}
          </div>
          <p>{comment.content}</p>
        </div>
      ))}
      
      {/* Add new comment form */}
      <div className="add-comment">
        <input
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={() => addComment(postId)}>Post</button>
      </div>
    </div>
  );
}

export default PostComments;
