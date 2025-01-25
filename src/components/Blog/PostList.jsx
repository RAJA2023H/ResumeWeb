import React from 'react';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import CommentSection from './CommentSection';
import styles from './Blog.module.css';

export default function PostList({ posts, user, setError }) {
  const handleDeletePost = async (postId) => {
    if (!user) {
      setError('You must be logged in to delete posts');
      return;
    }

    try {
        await deleteDoc(doc(db, 'Blog posts', 'Posts', postId));
    } catch (error) {
        console.error('Error deleting post', error);
        setError(`Failed to delete post: ${error.message}`);
    }
};

  return (
    <div className={styles.postGrid}>
      {posts.map((post) => (
        <div key={post.id} className={styles.postCard}>
          <div className={styles.postHeader}>
            <h3 className={styles.postTitle}>{post.title}</h3>
            {user && user.uid === post.userId && (
              <button 
                onClick={() => handleDeletePost(post.id)} 
                className={styles.deletePostButton}
              >
                Delete
              </button>
            )}
          </div>
          <p className={styles.postContent}>{post.content}</p>
          <p className={styles.postAuthor}>By {post.author}</p>

          <CommentSection postId={post.id} user={user} setError={setError} />
        </div>
      ))}
    </div>
  );
}