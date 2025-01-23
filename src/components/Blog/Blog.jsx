import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { signInWithPopup } from 'firebase/auth';
import { db, auth, googleProvider } from '../../firebase';
import styles from './Blog.module.css';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // Fetch posts
  useEffect(() => {
    const samplePosts = [
      {
        id: '1',
        title: 'First Blog Post',
        content: 'This is my first blog post about my journey.',
        author: 'John Doe',
        createdAt: new Date(),
      }
    ];
    setPosts(samplePosts);
  }, []);

  // Login with Google
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      setError(null);
    } catch (error) {
      console.error("Login error", error);
      setError(`Authentication failed: ${error.message}`);
    }
  };

  // Add comment
  const handleAddComment = async () => {
    if (!user || !newComment.trim()) {
      setError("Please sign in and enter a comment");
      return;
    }

    try {
      await addDoc(collection(db, 'posts', selectedPost.id, 'comments'), {
        text: newComment,
        author: user.displayName || 'Anonymous',
        createdAt: new Date(),
        userId: user.uid
      });
      setNewComment('');
      setError(null);
    } catch (error) {
      console.error("Error adding comment", error);
      setError(`Failed to post comment: ${error.message}`);
    }
  };

  return (
    <div id="Blog"className={styles.blogContainer}>
      {error && (
        <div className={styles.errorMessage}>
          {error}
        </div>
      )}

      <h2 className={styles.blogTitle}>Blog Posts</h2>
      
      <div className={styles.postGrid}>
        {posts.map((post) => (
          <div 
            key={post.id} 
            className={styles.postCard}
            onClick={() => setSelectedPost(post)}
          >
            <h3 className={styles.postTitle}>{post.title}</h3>
            <p className={styles.postContent}>{post.content.substring(0, 150)}...</p>
          </div>
        ))}
      </div>

      {selectedPost && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <button 
              onClick={() => setSelectedPost(null)}
              className={styles.closeButton}
            >
              ✕
            </button>
            <h2 className={styles.postTitle}>{selectedPost.title}</h2>
            <p className={styles.postContent}>{selectedPost.content}</p>

            <div className={styles.commentsSection}>
              <h3>Comments</h3>
              
              {!user ? (
                <button 
                  onClick={signInWithGoogle}
                  className={styles.loginButton}
                >
                  Sign in with Google
                </button>
              ) : (
                <div>
                  <textarea 
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    className={styles.commentInput}
                  />
                  <button 
                    onClick={handleAddComment}
                    className={styles.postCommentButton}
                  >
                    Post Comment
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}