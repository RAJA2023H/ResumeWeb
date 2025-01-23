import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { signInWithPopup } from 'firebase/auth';
import { db, auth, googleProvider } from '../../firebase';
import styles from './Blog.module.css';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
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
        author: 'Rajae',
        createdAt: new Date(),
      },
    ];
    setPosts(samplePosts);
  }, []);

  // Fetch comments for all posts
  useEffect(() => {
    posts.forEach((post) => {
      const q = query(
        collection(db, 'posts', post.id, 'comments'),
        orderBy('createdAt', 'desc')
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setComments((prevComments) => ({
          ...prevComments,
          [post.id]: snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })),
        }));
      });

      return unsubscribe; // Cleanup on unmount
    });
  }, [posts]);

  // Login with Google
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      setError(null);
    } catch (error) {
      console.error('Login error', error);
      setError(`Authentication failed: ${error.message}`);
    }
  };

  // Add comment
  const handleAddComment = async (postId) => {
    if (!user || !newComment.trim()) {
      setError('Please sign in and enter a comment');
      return;
    }

    try {
      await addDoc(collection(db, 'posts', postId, 'comments'), {
        text: newComment,
        author: user.displayName || 'Anonymous',
        createdAt: new Date(),
        userId: user.uid,
      });
      setNewComment('');
      setError(null);
    } catch (error) {
      console.error('Error adding comment', error);
      setError(`Failed to post comment: ${error.message}`);
    }
  };

  return (
    <div id="Blog" className={styles.blogContainer}>
      {error && <div className={styles.errorMessage}>{error}</div>}

      <h2 className={styles.blogTitle}></h2>

      <div className={styles.postGrid}>
        {posts.map((post) => (
          <div key={post.id} className={styles.postCard}>
            <h3 className={styles.postTitle}>{post.title}</h3>
            <p className={styles.postContent}>{post.content}</p>
            <p className={styles.postAuthor}>By {post.author}</p>

            <div className={styles.commentsSection}>
              {/* Display comments */}
              {comments[post.id]?.map((comment) => (
                <div key={comment.id} className={styles.comment}>
                  <p>
                    <strong>{comment.author}</strong>: {comment.text}
                  </p>
                </div>
              ))}

              {/* Comment input */}
              {!user ? (
                <button
                  onClick={signInWithGoogle}
                  className={styles.loginButton}
                >
                  Login to Comment
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
                    onClick={() => handleAddComment(post.id)}
                    className={styles.postCommentButton}
                  >
                    Post Comment
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}