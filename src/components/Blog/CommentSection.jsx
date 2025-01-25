import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
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

  return (
    <div className={styles.commentsSection}>
      {comments.map((comment) => (
        <div key={comment.id} className={styles.comment}>
          <p>
            <strong>{comment.author}</strong>: {comment.text}
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