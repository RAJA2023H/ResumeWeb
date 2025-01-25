import React, { useState, useEffect } from 'react';
import { collection, query, getDocs, onSnapshot } from 'firebase/firestore';
import { signInWithPopup, signOut, GoogleAuthProvider } from 'firebase/auth';
import { db, auth, googleProvider, isAdmin } from '../../firebase';
import PostList from './PostList';
import CreatePostModal from './CreatePostModal';
import styles from './Blog.module.css';


export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsRef = collection(db, 'Blog posts', 'Posts', 'items'); 
        const unsubscribe = onSnapshot(postsRef, 
          (snapshot) => {
            const postsData = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            
            console.log('Parsed Posts:', postsData);
            setPosts(postsData);
          },
          (error) => {
            console.error('Firestore error:', error);
            setError(`Firestore error: ${error.message}`);
          }
        );
  
        return () => unsubscribe();
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError(`Fetch error: ${error.message}`);
      }
    };
  
    fetchPosts();
  }, []);

  // Login
  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        'prompt': 'select_account' // account selection
    });
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      setError(null);
    } catch (error) {
      console.error('Login error', error);
      setError(`Authentication failed: ${error.message}`);
    }
  };

  // Logout
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Logout error', error);
      setError(`Logout failed: ${error.message}`);
    }
  };

  return (
    <div className={styles.blogContainer}>
      <div className={styles.authSection}>
        {user ? (
          <>
            <span>
              Welcome, {user.displayName}
              {isAdmin(user) ? " (Admin)" : " (User)"}
            </span>
            <button onClick={handleSignOut} className={styles.authButton}>Logout</button>
            {isAdmin(user) && (
              <button 
                onClick={() => setIsCreatePostModalOpen(true)} 
                className={styles.addPostButton}
              >
                Create New Post
              </button>
            )}
          </>
        ) : (
          <button onClick={signInWithGoogle} className={styles.authButton}>
            Login with Google
          </button>
        )}
      </div>

      {error && <div className={styles.errorMessage}>{error}</div>}

      <CreatePostModal 
        isOpen={isCreatePostModalOpen} 
        onClose={() => setIsCreatePostModalOpen(false)}
        user={user}
        setError={setError}
      />

      <PostList 
        posts={posts} 
        user={user} 
        setError={setError} 
      />
    </div>
  );
}