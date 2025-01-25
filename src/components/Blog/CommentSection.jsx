import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db,  isAdmin } from '../../firebase';
import styles from './Blog.module.css';


export default function CommentSection({ postId, user, setError }) {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, 'Blog posts', 'Posts', postId, 'comments'), 
      orderBy('createdAt', 'desc')
    );
   
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setComments(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, [postId]);

  const handleAddComment = async () => {
    if (!user || !newComment.trim()) {
      setError('Please sign in and enter a comment');
      return;
    }

    try {
      await addDoc(
        collection(db, 'Blog posts', 'Posts', postId, 'comments'),
        {
            text: newComment,
            author: user.displayName || 'Anonymous',
            createdAt: new Date(),
            userId: user.uid,
        }
      );
      setNewComment('');
      setError(null);
    } catch (error) {
      console.error('Error adding comment', error);
      setError(`Failed to post comment: ${error.message}`);
    }
  };
  const handleDeleteComment = async (commentId) => {
    // Only admin can delete comments
    if (!isAdmin(user)) {
      setError('Only admin can delete comments');
      return;
    }

    try {
      await deleteDoc(doc(db, 'Blog posts', 'Posts', postId, 'comments', commentId));
    } catch (error) {
      console.error('Error deleting comment', error);
      setError(`Failed to delete comment: ${error.message}`);
    }
  };
  return (
    <div className={styles.commentsSection}>
      {comments.map((comment) => (
        <div key={comment.id} className={styles.comment}>
          <p>
            <strong>{comment.author}</strong>: {comment.text}
            {isAdmin(user) && (
              <button 
                onClick={() => handleDeleteComment(comment.id)} 
                className={styles.deleteCommentButton}
              >
                Delete
              </button>
            )}
          </p>
        </div>
      ))}

      {!user ? (
        <p className={styles.loginPrompt}>Please log in to comment</p>
      ) : (
        <div className={styles.commentInputContainer}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className={styles.commentInput}
          />
          <button 
            onClick={handleAddComment} 
            className={styles.postCommentButton}
            disabled={!newComment.trim()}
          >
            Post Comment
          </button>
        </div>
      )}
    </div>
  );
}